import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  Wrench, 
  Users, 
  Eye, 
  EyeOff, 
  Upload,
  Zap,
  Droplet,
  Wind,
  X
} from "lucide-react";

const services = [
  { id: 'electric', name: 'Sửa điện', icon: Zap },
  { id: 'plumbing', name: 'Sửa nước', icon: Droplet },
  { id: 'ac', name: 'Điều hòa', icon: Wind },
  { id: 'general', name: 'Sửa chữa tổng hợp', icon: Wrench },
];

export default function Register() {
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get('type') === 'worker' ? 'worker' : 'customer';
  
  const [userType, setUserType] = useState<'customer' | 'worker'>(defaultType);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              {userType === 'worker' ? (
                <Wrench className="w-8 h-8 text-primary-foreground" />
              ) : (
                <Users className="w-8 h-8 text-primary-foreground" />
              )}
            </div>
            <h1 className="text-3xl font-bold">Đăng ký tài khoản</h1>
            <p className="text-muted-foreground mt-2">
              Tham gia cộng đồng ThợGần ngay hôm nay
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader className="text-center">
              <Tabs value={userType} onValueChange={(value) => setUserType(value as 'customer' | 'worker')}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="customer" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Khách hàng
                  </TabsTrigger>
                  <TabsTrigger value="worker" className="flex items-center gap-2">
                    <Wrench className="w-4 h-4" />
                    Thợ sửa chữa
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <CardTitle>
                {userType === 'worker' ? 'Đăng ký làm thợ' : 'Đăng ký khách hàng'}
              </CardTitle>
              <CardDescription>
                {userType === 'worker' 
                  ? 'Bắt đầu kiếm thêm thu nhập từ kỹ năng của bạn'
                  : 'Tìm thợ chuyên nghiệp cho mọi nhu cầu sửa chữa'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    placeholder="Nhập họ và tên"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  className="h-12"
                />
              </div>

              {userType === 'worker' && (
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ *</Label>
                  <Input
                    id="address"
                    placeholder="Nhập địa chỉ chi tiết"
                    className="h-12"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      className="h-12 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu"
                      className="h-12 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Worker-specific fields */}
              {userType === 'worker' && (
                <>
                  <div className="space-y-4">
                    <Label>Dịch vụ cung cấp *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`
                            p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-soft
                            ${selectedServices.includes(service.id)
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <service.icon className={`w-5 h-5 ${
                              selectedServices.includes(service.id) ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                            <span className={`font-medium ${
                              selectedServices.includes(service.id) ? 'text-primary' : 'text-foreground'
                            }`}>
                              {service.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedServices.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedServices.map((serviceId) => {
                          const service = services.find(s => s.id === serviceId);
                          return (
                            <Badge key={serviceId} variant="secondary" className="flex items-center gap-1">
                              {service?.name}
                              <X 
                                className="w-3 h-3 cursor-pointer" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleService(serviceId);
                                }}
                              />
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Kinh nghiệm làm việc</Label>
                    <Textarea
                      id="experience"
                      placeholder="Mô tả kinh nghiệm và kỹ năng của bạn..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documents">Giấy tờ chứng nhận (tuỳ chọn)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Tải lên CMND/CCCD hoặc giấy phép hành nghề
                      </p>
                      <Button variant="outline" size="sm">
                        Chọn file
                      </Button>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border border-input mt-1"
                />
                <Label htmlFor="terms" className="text-sm leading-5">
                  Tôi đồng ý với{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Chính sách bảo mật
                  </Link>{" "}
                  của ThợGần
                </Label>
              </div>

              <Button className="w-full h-12 text-base">
                {userType === 'worker' ? 'Đăng ký làm thợ' : 'Đăng ký khách hàng'}
              </Button>

              <div className="text-center">
                <span className="text-muted-foreground">Đã có tài khoản? </span>
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Đăng nhập ngay
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}