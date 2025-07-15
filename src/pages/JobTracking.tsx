import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle,
  MessageCircle,
  Phone,
  Calendar,
  DollarSign,
  Wrench,
  ArrowLeft
} from "lucide-react";

interface JobDetails {
  id: string;
  service: string;
  description: string;
  address: string;
  price: number;
  estimatedTime: string;
  status: 'in_progress' | 'completed';
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  worker: {
    id: string;
    name: string;
    phone: string;
    rating: number;
    avatar: string;
  };
}

const mockJob: JobDetails = {
  id: 'job_001',
  service: 'Sửa điện',
  description: 'Thay bóng đèn LED chất lượng cao, kiểm tra hệ thống điện. Bảo hành 6 tháng.',
  address: '123 Nguyễn Văn A, Phường Bến Nghé, Quận 1, TP.HCM',
  price: 150000,
  estimatedTime: '30-45 phút',
  status: 'in_progress',
  createdAt: '2024-01-15 14:30',
  startedAt: '2024-01-15 15:00',
  worker: {
    id: 'w1',
    name: 'Anh Minh Electrician',
    phone: '0901234567',
    rating: 4.9,
    avatar: '/placeholder.svg'
  }
};

export default function JobTracking() {
  const navigate = useNavigate();
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleCompleteJob = () => {
    // Simulate job completion
    mockJob.status = 'completed';
    mockJob.completedAt = new Date().toISOString();
    setShowRating(true);
  };

  const handleSubmitReview = () => {
    // Submit review and rating
    navigate('/my-requests');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="customer" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/my-requests')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Theo dõi công việc</h1>
              <p className="text-muted-foreground">Mã công việc: #{mockJob.id}</p>
            </div>
          </div>

          {/* Status Banner */}
          <Card className="shadow-soft mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    mockJob.status === 'completed' ? 'bg-success/20' : 'bg-primary/20'
                  }`}>
                    {mockJob.status === 'completed' ? (
                      <CheckCircle className="w-8 h-8 text-success" />
                    ) : (
                      <Wrench className="w-8 h-8 text-primary animate-pulse" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {mockJob.status === 'completed' ? 'Đã hoàn thành' : 'Đang thực hiện'}
                    </h2>
                    <p className="text-muted-foreground">
                      {mockJob.status === 'completed' 
                        ? 'Công việc đã được hoàn thành thành công'
                        : 'Thợ đang thực hiện công việc tại địa chỉ của bạn'
                      }
                    </p>
                  </div>
                </div>
                
                <Badge 
                  variant={mockJob.status === 'completed' ? 'default' : 'secondary'}
                  className={mockJob.status === 'completed' ? 'bg-success' : ''}
                >
                  {mockJob.status === 'completed' ? 'Hoàn thành' : 'Đang làm'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Chi tiết</TabsTrigger>
              <TabsTrigger value="worker">Thông tin thợ</TabsTrigger>
              <TabsTrigger value="timeline">Tiến trình</TabsTrigger>
            </TabsList>

            {/* Job Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Thông tin công việc</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Dịch vụ</Label>
                      <p className="font-semibold">{mockJob.service}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Chi phí</Label>
                      <p className="font-semibold text-lg text-primary">{formatPrice(mockJob.price)}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Thời gian dự kiến</Label>
                      <p className="font-semibold">{mockJob.estimatedTime}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Bảo hành</Label>
                      <p className="font-semibold">6 tháng</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Mô tả</Label>
                    <p className="mt-1">{mockJob.description}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Địa chỉ</Label>
                    <div className="flex items-start gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <p>{mockJob.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Worker Info Tab */}
            <TabsContent value="worker" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Thông tin thợ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold text-lg">
                        {mockJob.worker.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{mockJob.worker.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mockJob.worker.rating}</span>
                        <span className="text-muted-foreground text-sm">(127 đánh giá)</span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-1">
                        Chuyên gia sửa chữa điện với hơn 5 năm kinh nghiệm
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Nhắn tin
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Gọi điện
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Tiến trình thực hiện</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-success-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Yêu cầu được tạo</h4>
                        <p className="text-sm text-muted-foreground">15/01/2024 - 14:30</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-success-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Thợ được chọn</h4>
                        <p className="text-sm text-muted-foreground">15/01/2024 - 14:45</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-success-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Bắt đầu thực hiện</h4>
                        <p className="text-sm text-muted-foreground">15/01/2024 - 15:00</p>
                      </div>
                    </div>

                    {mockJob.status === 'completed' ? (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-success-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Hoàn thành công việc</h4>
                          <p className="text-sm text-muted-foreground">
                            {mockJob.completedAt && new Date(mockJob.completedAt).toLocaleString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                          <Wrench className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Đang thực hiện</h4>
                          <p className="text-sm text-muted-foreground">Dự kiến hoàn thành trong {mockJob.estimatedTime}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Button */}
          {mockJob.status === 'in_progress' && (
            <Card className="shadow-soft">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">
                  Sau khi thợ hoàn thành công việc, bạn có thể xác nhận và đánh giá
                </p>
                <Button onClick={handleCompleteJob} size="lg">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Xác nhận hoàn thành
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Rating Modal/Card */}
          {showRating && (
            <Card className="shadow-strong border-primary">
              <CardHeader>
                <CardTitle>Đánh giá công việc</CardTitle>
                <CardDescription>
                  Chia sẻ trải nghiệm của bạn để giúp cộng đồng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Đánh giá chất lượng</Label>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-8 h-8 cursor-pointer transition-colors ${
                          star <= rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300 hover:text-yellow-400'
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="review" className="text-sm font-medium">Nhận xét (tuỳ chọn)</Label>
                  <textarea
                    id="review"
                    placeholder="Chia sẻ về chất lượng dịch vụ, thái độ của thợ..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full mt-2 p-3 border rounded-lg resize-none h-20"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowRating(false)}
                    className="flex-1"
                  >
                    Bỏ qua
                  </Button>
                  <Button 
                    onClick={handleSubmitReview}
                    disabled={rating === 0}
                    className="flex-1"
                  >
                    Gửi đánh giá
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Label({ children, className, ...props }: any) {
  return (
    <div className={`text-sm font-medium text-muted-foreground ${className}`} {...props}>
      {children}
    </div>
  );
}