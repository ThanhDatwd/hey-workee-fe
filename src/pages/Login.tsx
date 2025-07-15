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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Đăng nhập</h1>
            <p className="text-muted-foreground mt-2">
              Chào mừng trở lại với ThợGần
            </p>
          </div>

          <Card className="shadow-medium">
            <CardHeader className="text-center pb-2">
              <CardTitle>Đăng nhập vào tài khoản</CardTitle>
              <CardDescription>
                Sử dụng email hoặc số điện thoại để đăng nhập
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'email' | 'phone')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Số điện thoại
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập email của bạn"
                      className="h-12"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="phone" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      className="h-12"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
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

              <Button className="w-full h-12 text-base">
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
                <span className="text-muted-foreground">Chưa có tài khoản? </span>
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Đăng ký ngay
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}