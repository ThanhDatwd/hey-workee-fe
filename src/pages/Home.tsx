import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Wrench, 
  Zap, 
  Droplet, 
  Wind, 
  Star,
  MapPin,
  Clock,
  Shield,
  Smartphone,
  ArrowRight
} from "lucide-react";
import Navigation from "@/components/Navigation";

const services = [
  {
    icon: Zap,
    title: "Sửa điện",
    description: "Sửa chữa hệ thống điện, thay bóng đèn, lắp ổ cắm",
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    icon: Droplet,
    title: "Sửa nước",
    description: "Sửa vòi nước, thông tắc, lắp đặt thiết bị",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Wind,
    title: "Điều hòa",
    description: "Vệ sinh, sửa chữa, lắp đặt điều hòa",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Wrench,
    title: "Sửa chữa tổng hợp",
    description: "Sửa chữa đồ gia dụng, đồ nội thất",
    color: "bg-purple-100 text-purple-600"
  }
];

const features = [
  {
    icon: MapPin,
    title: "Tìm thợ gần nhất",
    description: "Hệ thống tự động tìm thợ có kỹ năng phù hợp gần bạn nhất"
  },
  {
    icon: Clock,
    title: "Phản hồi nhanh",
    description: "Thợ sẽ phản hồi báo giá trong vòng 30 phút"
  },
  {
    icon: Shield,
    title: "Đảm bảo chất lượng",
    description: "Tất cả thợ đều được xác minh và có đánh giá từ khách hàng"
  },
  {
    icon: Smartphone,
    title: "Dễ sử dụng",
    description: "Giao diện thân thiện, tối ưu cho điện thoại"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background mobile-container">
      <div className="mobile-content">
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-primary-foreground py-12 lg:py-24 mobile-section">
        <div className="mobile-container px-4 text-center">
          <h1 className="mobile-heading text-2xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Tìm thợ sửa chữa
            <br />
            <span className="text-blue-100">gần bạn nhất</span>
          </h1>
          <p className="text-base lg:text-2xl mb-6 text-blue-100 max-w-2xl mx-auto">
            Kết nối nhanh chóng với thợ có kỹ năng phù hợp trong khu vực của bạn
          </p>
          <div className="flex flex-col gap-3 justify-center">
            <Link to="/create-request" className="w-full">
              <Button size="lg" variant="secondary" className="mobile-button w-full text-lg px-8">
                Tạo yêu cầu ngay
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/register?type=worker" className="w-full">
              <Button size="lg" variant="outline" className="mobile-button w-full text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Trở thành thợ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-8 lg:py-24 mobile-section">
        <div className="mobile-container px-4">
          <div className="text-center mb-8">
            <h2 className="mobile-heading text-xl lg:text-4xl font-bold mb-3">
              Dịch vụ phổ biến
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi kết nối bạn với các thợ chuyên nghiệp trong nhiều lĩnh vực
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
            {services.map((service, index) => (
              <Card key={index} className="mobile-card hover:shadow-medium transition-shadow cursor-pointer">
                <CardHeader className="text-center p-4">
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl ${service.color} flex items-center justify-center mx-auto mb-3`}>
                    <service.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  <CardTitle className="text-sm lg:text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription className="text-center text-xs lg:text-sm">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tại sao chọn Thợ Ơiii?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">1000+</div>
              <div className="text-lg text-muted-foreground">Thợ đã đăng ký</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">5000+</div>
              <div className="text-lg text-muted-foreground">Công việc hoàn thành</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-4xl lg:text-5xl font-bold text-primary mb-2">
                <Star className="w-8 h-8 fill-current" />
                4.8
              </div>
              <div className="text-lg text-muted-foreground">Đánh giá trung bình</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Bắt đầu ngay hôm nay
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tạo yêu cầu đầu tiên của bạn hoặc tham gia với tư cách là thợ để bắt đầu kiếm thêm thu nhập
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create-request">
              <Button size="lg" className="px-8 py-3">
                Tôi cần thuê thợ
              </Button>
            </Link>
            <Link to="/register?type=worker">
              <Button size="lg" variant="outline" className="px-8 py-3">
                Tôi là thợ
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
      <Navigation />
    </div>
  );
}