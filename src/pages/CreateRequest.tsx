import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Zap, 
  Droplet, 
  Wind, 
  Wrench, 
  MapPin, 
  Camera, 
  Upload,
  X,
  CheckCircle
} from "lucide-react";

const services = [
  { 
    id: 'electric', 
    name: 'Sửa điện', 
    icon: Zap, 
    color: 'bg-yellow-100 text-yellow-600',
    examples: ['Thay bóng đèn', 'Sửa ổ cắm', 'Lắp quạt trần', 'Sửa cầu dao']
  },
  { 
    id: 'plumbing', 
    name: 'Sửa nước', 
    icon: Droplet, 
    color: 'bg-blue-100 text-blue-600',
    examples: ['Sửa vòi nước', 'Thông tắc cống', 'Lắp bồn cầu', 'Sửa máy bơm']
  },
  { 
    id: 'ac', 
    name: 'Điều hòa', 
    icon: Wind, 
    color: 'bg-green-100 text-green-600',
    examples: ['Vệ sinh điều hòa', 'Sửa máy lạnh', 'Nạp gas', 'Lắp đặt mới']
  },
  { 
    id: 'general', 
    name: 'Sửa chữa tổng hợp', 
    icon: Wrench, 
    color: 'bg-purple-100 text-purple-600',
    examples: ['Sửa tủ bếp', 'Lắp kệ', 'Sửa cửa', 'Sơn tường']
  },
];

export default function CreateRequest() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string>('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedService || !description || !address) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/waiting-response');
    }, 2000);
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="customer" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Tạo yêu cầu công việc</h1>
            <p className="text-muted-foreground">
              Mô tả chi tiết công việc để nhận được báo giá chính xác nhất
            </p>
          </div>

          <div className="space-y-8">
            {/* Service Selection */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Chọn loại dịch vụ
                </CardTitle>
                <CardDescription>
                  Chọn dịch vụ phù hợp với nhu cầu của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`
                        p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-soft
                        ${selectedService === service.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center flex-shrink-0`}>
                          <service.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-2 ${
                            selectedService === service.id ? 'text-primary' : 'text-foreground'
                          }`}>
                            {service.name}
                          </h3>
                          <div className="flex flex-wrap gap-1">
                            {service.examples.slice(0, 2).map((example, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedServiceData && (
                  <div className="mt-4 p-4 bg-accent/50 rounded-lg">
                    <h4 className="font-medium mb-2">Các công việc phổ biến:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedServiceData.examples.map((example, index) => (
                        <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Mô tả công việc
                </CardTitle>
                <CardDescription>
                  Mô tả chi tiết vấn đề và yêu cầu của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Chi tiết công việc *</Label>
                  <Textarea
                    id="description"
                    placeholder="Ví dụ: Bóng đèn phòng khách bị chập chờn, cần thay mới. Trần nhà cao khoảng 3m..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Hình ảnh (tuỳ chọn)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Chụp ảnh để thợ hiểu rõ hơn về vấn đề
                    </p>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Chọn ảnh
                    </Button>
                  </div>
                  
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={image} 
                            alt={`Preview ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Địa chỉ thực hiện
                </CardTitle>
                <CardDescription>
                  Cung cấp địa chỉ chính xác để thợ có thể đến
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ chi tiết *</Label>
                  <Input
                    id="address"
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, thành phố"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <Button variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Sử dụng vị trí hiện tại
                </Button>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/')}
                    className="sm:w-auto"
                  >
                    Huỷ bỏ
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!selectedService || !description || !address || isSubmitting}
                    className="sm:w-auto"
                  >
                    {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Sau khi gửi yêu cầu, hệ thống sẽ tự động tìm thợ phù hợp trong khu vực của bạn
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}