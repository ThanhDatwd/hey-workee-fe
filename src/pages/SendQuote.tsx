import { useState } from "react";
import { ArrowLeft, Camera, Clock, DollarSign, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const SendQuote = () => {
  const { toast } = useToast();
  const [quote, setQuote] = useState({
    price: "",
    completionTime: "",
    description: "",
    warranty: "",
  });

  // Mock request data - in real app this would come from route params
  const requestData = {
    id: 1,
    service: "Sửa điện",
    description: "Mất điện toàn bộ tầng 2, cần thợ kiểm tra và sửa chữa khẩn cấp",
    customer: "Anh Minh",
    location: "123 Nguyễn Trãi, Quận 1, TP.HCM",
    time: "10 phút trước",
    budget: "200,000 - 500,000đ",
    urgent: true,
    images: ["electrical-problem-1.jpg", "electrical-problem-2.jpg"]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quote.price || !quote.completionTime || !quote.description) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ thông tin báo giá",
        variant: "destructive",
      });
      return;
    }

    // Mock submit
    toast({
      title: "Gửi báo giá thành công",
      description: "Báo giá của bạn đã được gửi đến khách hàng",
    });

    // Reset form
    setQuote({
      price: "",
      completionTime: "",
      description: "",
      warranty: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setQuote(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navigation userType="worker" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gửi báo giá</h1>
          <p className="text-muted-foreground">Tạo báo giá chi tiết cho khách hàng</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request Details */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin yêu cầu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">{requestData.service}</h3>
                {requestData.urgent && (
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Khẩn cấp</Badge>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium">Mô tả chi tiết:</Label>
                <p className="text-muted-foreground mt-1">{requestData.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Khách hàng:</Label>
                  <p className="text-muted-foreground">{requestData.customer}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Thời gian đăng:</Label>
                  <p className="text-muted-foreground">{requestData.time}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Địa chỉ:</Label>
                <p className="text-muted-foreground">{requestData.location}</p>
              </div>

              <div>
                <Label className="text-sm font-medium">Ngân sách dự kiến:</Label>
                <p className="text-primary font-semibold">{requestData.budget}</p>
              </div>

              {requestData.images.length > 0 && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">Hình ảnh đính kèm:</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {requestData.images.map((image, index) => (
                      <div key={index} className="bg-secondary/50 rounded-lg p-4 text-center">
                        <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">{image}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quote Form */}
          <Card>
            <CardHeader>
              <CardTitle>Tạo báo giá</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="price" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Giá dịch vụ (VNĐ) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Nhập số tiền"
                    value={quote.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Giá đã bao gồm vật tư và công lao động
                  </p>
                </div>

                <div>
                  <Label htmlFor="completionTime" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Thời gian hoàn thành *
                  </Label>
                  <Input
                    id="completionTime"
                    placeholder="VD: 2-3 giờ, 1 ngày, 2-3 ngày..."
                    value={quote.completionTime}
                    onChange={(e) => handleInputChange("completionTime", e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Mô tả công việc *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Mô tả chi tiết những gì bạn sẽ làm, vật tư sử dụng..."
                    value={quote.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="warranty">Chế độ bảo hành</Label>
                  <Input
                    id="warranty"
                    placeholder="VD: Bảo hành 6 tháng, 1 năm..."
                    value={quote.warranty}
                    onChange={(e) => handleInputChange("warranty", e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Không bắt buộc nhưng sẽ tăng uy tín của bạn
                  </p>
                </div>

                <div className="bg-secondary/50 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">Tóm tắt báo giá</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Giá dịch vụ:</span>
                      <span className="font-semibold">
                        {quote.price ? `${parseInt(quote.price).toLocaleString()}đ` : '---'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thời gian:</span>
                      <span>{quote.completionTime || '---'}</span>
                    </div>
                    {quote.warranty && (
                      <div className="flex justify-between">
                        <span>Bảo hành:</span>
                        <span>{quote.warranty}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1">
                    Lưu nháp
                  </Button>
                  <Button type="submit" className="flex-1">
                    Gửi báo giá
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SendQuote;