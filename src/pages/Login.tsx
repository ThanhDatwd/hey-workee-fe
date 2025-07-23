import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { Wrench, Mail, Phone, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  return (
    <div className="min-h-screen bg-background mobile-container">
      <div className="mobile-content">
      
      <div className="mobile-container px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="mobile-heading text-2xl font-bold">Đăng nhập</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Chào mừng trở lại với Thợ Ơiii
            </p>
          </div>

          <Card className="mobile-card shadow-medium">
            <CardHeader className="text-center pb-2 p-4">
              <CardTitle className="text-lg">Đăng nhập vào tài khoản</CardTitle>
              <CardDescription className="text-sm">
                Sử dụng email hoặc số điện thoại để đăng nhập
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-5 p-4">
              <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'email' | 'phone')}>
                <TabsList className="grid w-full grid-cols-2 mobile-button">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Số điện thoại
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập email của bạn"
                      className="mobile-button"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="phone" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Số điện thoại</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      className="mobile-button"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="mobile-button pr-12"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border border-input"
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Ghi nhớ đăng nhập
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <Button className="w-full mobile-button text-base">
                Đăng nhập
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Hoặc
                  </span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-muted-foreground text-sm">Chưa có tài khoản? </span>
                <Link to="/register" className="text-primary hover:underline font-medium text-sm">
                  Đăng ký ngay
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
      <Navigation />
    </div>
  );
}