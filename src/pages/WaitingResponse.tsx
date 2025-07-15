import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Loader2, 
  MapPin, 
  Clock, 
  Search,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

export default function WaitingResponse() {
  const navigate = useNavigate();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [foundWorkers, setFoundWorkers] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    // Simulate finding workers
    const findWorkersTimer = setTimeout(() => {
      setFoundWorkers(3);
      setTimeout(() => {
        navigate('/quotes');
      }, 2000);
    }, 8000);

    return () => {
      clearInterval(timer);
      clearTimeout(findWorkersTimer);
    };
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="customer" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Đang tìm thợ gần bạn</h1>
            <p className="text-muted-foreground">
              Hệ thống đang tìm kiếm thợ phù hợp trong khu vực của bạn
            </p>
          </div>

          <div className="space-y-6">
            {/* Request Summary */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl">Thông tin yêu cầu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Sửa điện</p>
                    <p className="text-muted-foreground text-sm">
                      Bóng đèn phòng khách bị chập chờn, cần thay mới...
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>123 Nguyễn Văn A, Quận 1, TP.HCM</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Đã gửi {formatTime(timeElapsed)} trước</span>
                </div>
              </CardContent>
            </Card>

            {/* Search Status */}
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      {foundWorkers > 0 ? (
                        <CheckCircle className="w-12 h-12 text-primary-foreground" />
                      ) : (
                        <Search className="w-12 h-12 text-primary-foreground animate-spin" />
                      )}
                    </div>
                    
                    {/* Ripple effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 border-4 border-primary/30 rounded-full animate-ping"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border-4 border-primary/20 rounded-full animate-ping animation-delay-1000"></div>
                    </div>
                  </div>

                  {foundWorkers > 0 ? (
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-success">
                        Tìm thấy {foundWorkers} thợ phù hợp!
                      </h3>
                      <p className="text-muted-foreground">
                        Đang chuyển hướng đến trang báo giá...
                      </p>
                      <div className="flex justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold">Đang tìm kiếm thợ</h3>
                      <p className="text-muted-foreground">
                        Hệ thống đang tìm thợ có kỹ năng phù hợp trong bán kính 5km
                      </p>
                    </div>
                  )}
                </div>

                {/* Search Progress */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-success font-medium">Yêu cầu đã được gửi</span>
                  </div>
                  
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    timeElapsed > 3 ? 'bg-success/10' : 'bg-muted'
                  }`}>
                    {timeElapsed > 3 ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    )}
                    <span className={timeElapsed > 3 ? 'text-success font-medium' : 'text-muted-foreground'}>
                      Đang phân tích khu vực
                    </span>
                  </div>
                  
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    foundWorkers > 0 ? 'bg-success/10' : 'bg-muted'
                  }`}>
                    {foundWorkers > 0 ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    )}
                    <span className={foundWorkers > 0 ? 'text-success font-medium' : 'text-muted-foreground'}>
                      Gửi thông báo cho thợ
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="shadow-soft border-blue-200 bg-blue-50/50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-900">Mẹo để nhận báo giá nhanh hơn:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Mô tả chi tiết vấn đề trong yêu cầu</li>
                      <li>• Đính kèm hình ảnh rõ nét</li>
                      <li>• Cung cấp địa chỉ chính xác</li>
                      <li>• Thời gian tốt nhất: 8h-20h các ngày trong tuần</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={() => navigate('/my-requests')}
                className="sm:w-auto"
              >
                Xem tất cả yêu cầu
              </Button>
              <Button 
                variant="destructive"
                onClick={() => navigate('/')}
                className="sm:w-auto"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Huỷ yêu cầu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}