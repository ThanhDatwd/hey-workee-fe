import { useState } from "react";
import { MapPin, Clock, Filter, Search, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";

const WorkerRequests = () => {
  const [selectedService, setSelectedService] = useState("all");
  const [selectedDistance, setSelectedDistance] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const services = [
    "Sửa điện", "Sửa nước", "Vệ sinh điều hòa", "Sửa máy giặt", 
    "Thông tắc cống", "Lắp đặt thiết bị", "Sơn nhà", "Khác"
  ];

  const requests = [
    {
      id: 1,
      service: "Sửa điện",
      description: "Mất điện toàn bộ tầng 2, cần thợ kiểm tra và sửa chữa khẩn cấp",
      customer: "Anh Minh",
      location: "123 Nguyễn Trãi, Quận 1, TP.HCM",
      distance: "0.8km",
      time: "10 phút trước",
      urgent: true,
      budget: "200,000 - 500,000đ",
      images: 2
    },
    {
      id: 2,
      service: "Sửa nước",
      description: "Vòi nước bể rửa chén bị rò rỉ, nước chảy liên tục",
      customer: "Chị Lan",
      location: "456 Lê Lợi, Quận 3, TP.HCM",
      distance: "1.5km", 
      time: "25 phút trước",
      urgent: false,
      budget: "100,000 - 300,000đ",
      images: 1
    },
    {
      id: 3,
      service: "Vệ sinh điều hòa",
      description: "Điều hòa chạy không mát, có mùi hôi, cần vệ sinh sâu",
      customer: "Anh Tuấn",
      location: "789 Võ Văn Tần, Quận 7, TP.HCM",
      distance: "2.1km",
      time: "1 giờ trước",
      urgent: false,
      budget: "200,000 - 400,000đ",
      images: 0
    },
    {
      id: 4,
      service: "Sửa máy giặt",
      description: "Máy giặt không vắt được, kêu to khi hoạt động",
      customer: "Chị Hoa",
      location: "321 Hai Bà Trưng, Quận 1, TP.HCM",
      distance: "0.5km",
      time: "2 giờ trước",
      urgent: false,
      budget: "150,000 - 350,000đ",
      images: 3
    }
  ];

  const filteredRequests = requests.filter(request => {
    const matchesService = selectedService === "all" || request.service === selectedService;
    const matchesSearch = request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesService && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navigation userType="worker" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Yêu cầu công việc</h1>
          <p className="text-muted-foreground">Tìm kiếm và nhận công việc phù hợp gần bạn</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Bộ lọc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Tìm kiếm</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm theo mô tả hoặc khách hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Dịch vụ</label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dịch vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả dịch vụ</SelectItem>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>{service}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Khoảng cách</label>
                <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn khoảng cách" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="1km">Dưới 1km</SelectItem>
                    <SelectItem value="2km">Dưới 2km</SelectItem>
                    <SelectItem value="5km">Dưới 5km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        <div className="space-y-6">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-foreground">{request.service}</h3>
                    {request.urgent && (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Khẩn cấp</Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{request.time}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      {request.distance}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{request.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Khách hàng:</p>
                    <p className="text-sm text-muted-foreground">{request.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Ngân sách dự kiến:</p>
                    <p className="text-sm text-primary font-semibold">{request.budget}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-1">Địa chỉ:</p>
                  <p className="text-sm text-muted-foreground">{request.location}</p>
                </div>

                {request.images > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      📷 {request.images} hình ảnh đính kèm
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 md:flex-none">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem chi tiết
                  </Button>
                  <Button className="flex-1 md:flex-none">
                    Gửi báo giá
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground text-lg">Không có yêu cầu nào phù hợp với bộ lọc</p>
              <p className="text-sm text-muted-foreground mt-2">Thử thay đổi bộ lọc để xem thêm yêu cầu</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkerRequests;