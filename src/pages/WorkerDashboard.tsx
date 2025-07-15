import { Bell, Briefcase, TrendingUp, Clock, Star, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const WorkerDashboard = () => {
  const stats = [
    { title: "Yêu cầu mới", value: "8", icon: Bell, color: "text-blue-600" },
    { title: "Đang thực hiện", value: "3", icon: Briefcase, color: "text-orange-600" },
    { title: "Đã hoàn thành", value: "24", icon: TrendingUp, color: "text-green-600" },
    { title: "Thu nhập tháng", value: "5.2M", icon: DollarSign, color: "text-purple-600" },
  ];

  const recentRequests = [
    {
      id: 1,
      service: "Sửa điện",
      customer: "Anh Minh",
      location: "Quận 1, TP.HCM",
      time: "10 phút trước",
      status: "new",
      price: "200,000đ"
    },
    {
      id: 2,
      service: "Sửa nước",
      customer: "Chị Lan",
      location: "Quận 3, TP.HCM", 
      time: "25 phút trước",
      status: "quoted",
      price: "150,000đ"
    },
    {
      id: 3,
      service: "Vệ sinh điều hòa",
      customer: "Anh Tuấn",
      location: "Quận 7, TP.HCM",
      time: "1 giờ trước", 
      status: "in-progress",
      price: "300,000đ"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Mới</Badge>;
      case 'quoted':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Đã báo giá</Badge>;
      case 'in-progress':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Đang làm</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navigation userType="worker" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Thợ</h1>
          <p className="text-muted-foreground">Quản lý công việc và thu nhập của bạn</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Hành động nhanh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Bell className="h-5 w-5" />
                <span className="text-sm">Yêu cầu mới</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Briefcase className="h-5 w-5" />
                <span className="text-sm">Đơn hàng</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Star className="h-5 w-5" />
                <span className="text-sm">Đánh giá</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <DollarSign className="h-5 w-5" />
                <span className="text-sm">Thu nhập</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Yêu cầu gần đây</CardTitle>
              <Button variant="outline" size="sm">Xem tất cả</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{request.service}</h3>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{request.customer} • {request.location}</p>
                    <p className="text-xs text-muted-foreground mt-1">{request.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{request.price}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      {request.status === 'new' ? 'Báo giá' : 'Xem'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerDashboard;