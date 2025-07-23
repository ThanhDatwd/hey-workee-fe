import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import {
  Search,
  Filter,
  Clock,
  MapPin,
  Star,
  Calendar,
  DollarSign,
  Eye,
  MessageCircle,
} from "lucide-react";
import { jobService } from "@/services/jobService";

interface Request {
  id: string;
  serviceId: string;
  customerName?: string;
  customerId: string;
  serviceName: string;
  description: string;
  address: string;
  createdAt: string;
  status: "PENDING" | "SENT" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  price?: number;
  quotesCount?: number;
  rating?: number;
}

const statusConfig = {
  waiting: { label: "Đang chờ", color: "bg-yellow-100 text-yellow-800" },
  quoted: { label: "Có báo giá", color: "bg-blue-100 text-blue-800" },
  in_progress: {
    label: "Đang thực hiện",
    color: "bg-orange-100 text-orange-800",
  },
  completed: { label: "Hoàn thành", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Đã huỷ", color: "bg-gray-100 text-gray-800" },
};

export default function MyRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [requests, setRequests] = useState<Request[]>([]);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      all: requests.length,
      pending: requests.filter((r) => r.status === "PENDING").length,
      sent: requests.filter((r) => r.status === "SENT").length,
      confirmed: requests.filter((r) => r.status === "CONFIRMED").length,
      completed: requests.filter((r) => r.status === "COMPLETED").length,
      cancelled: requests.filter((r) => r.status === "CANCELLED").length,
    };
  };

  const statusCounts = getStatusCounts();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchRequests = async () => {
    try {
      const response = await jobService.getAllJobRequest({
        pageSize: 100,
        pageNumber: 0,
      });
      const data = response.data.content || [];
      setRequests(data);
    } catch (error) {
      console.log("Error fetching job requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  return (
    <div className="min-h-screen bg-background mobile-container">
      <Navigation userType="customer" />

      <div className="mobile-container px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <h1 className="mobile-heading text-xl font-bold mb-2">Yêu cầu của tôi</h1>
              <p className="text-muted-foreground text-sm">
                Quản lý tất cả yêu cầu dịch vụ của bạn
              </p>
            </div>
            <Link to="/create-request" className="w-full">
              <Button size="lg" className="mobile-button w-full">
                Tạo yêu cầu mới
              </Button>
            </Link>
          </div>

          {/* Search and Filter */}
          <Card className="mobile-card shadow-soft mb-6">
            <CardContent className="pt-4 p-4">
              <div className="flex flex-col gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm yêu cầu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 mobile-button"
                  />
                </div>
                <Button variant="outline" className="mobile-button">
                  <Filter className="w-4 h-4 mr-2" />
                  Lọc
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Tabs */}
          <Tabs
            value={statusFilter}
            onValueChange={setStatusFilter}
            className="space-y-6"
          >
            <Tabs
              value={statusFilter}
              onValueChange={setStatusFilter}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all" className="relative">
                  Tất cả
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {statusCounts.all}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="PENDING" className="relative">
                  Chờ báo giá
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {statusCounts.pending}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="SENT" className="relative">
                  Có báo giá
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {statusCounts.sent}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="CONFIRMED" className="relative">
                  Đang làm
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {statusCounts.confirmed}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="COMPLETED" className="relative">
                  Hoàn thành
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {statusCounts.completed}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="CANCELLED" className="relative">
                  Đã hủy
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {statusCounts.cancelled}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <TabsContent value={statusFilter} className="space-y-4">
              {filteredRequests.length === 0 ? (
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center py-12">
                    <div className="text-muted-foreground mb-4">
                      <Calendar className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        Không có yêu cầu nào
                      </h3>
                      <p>
                        {statusFilter === "all"
                          ? "Bạn chưa tạo yêu cầu nào"
                          : `Không có yêu cầu nào ở trạng thái ${statusConfig[
                              statusFilter as keyof typeof statusConfig
                            ]?.label.toLowerCase()}`}
                      </p>
                    </div>
                    <Link to="/create-request">
                      <Button>Tạo yêu cầu đầu tiên</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                filteredRequests.map((request) => (
                  <Card
                    key={request.id}
                    className="shadow-soft hover:shadow-medium transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg">
                              {request.serviceName}
                            </CardTitle>
                            <Badge>{request.status}</Badge>
                          </div>
                          <CardDescription className="text-sm">
                            Mã: #{request.id}
                          </CardDescription>
                        </div>

                        {request.price && (
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary">
                              {formatPrice(request.price)}
                            </div>
                            {request.rating && (
                              <div className="flex items-center gap-1 justify-end mt-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">
                                  {request.rating}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-sm line-clamp-2">
                        {request.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{request.address}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDate(request.createdAt)}</span>
                        </div>
                      </div>

                      {request.customerName && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">
                            Khách hàng:
                          </span>
                          <span className="font-medium">
                            {request.customerName}
                          </span>
                        </div>
                      )}

                      {request.quotesCount && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">
                            Báo giá:
                          </span>
                          <Badge variant="outline">
                            {request.quotesCount} báo giá
                          </Badge>
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        {request.status === "PENDING" && (
                          <Button variant="outline" className="flex-1">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Liên hệ hỗ trợ
                          </Button>
                        )}

                        {request.status === "SENT" && (
                          <Link to="/quotes" className="flex-1">
                            <Button className="w-full">
                              Xem báo giá ({request.quotesCount})
                            </Button>
                          </Link>
                        )}

                        {request.status === "CONFIRMED" && (
                          <Link to="/job-tracking" className="flex-1">
                            <Button className="w-full">
                              Theo dõi công việc
                            </Button>
                          </Link>
                        )}

                        {request.status === "COMPLETED" && (
                          <Link to="/job-tracking" className="flex-1">
                            <Button variant="outline" className="w-full">
                              <Eye className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </Button>
                          </Link>
                        )}

                        {request.status === "CANCELLED" && (
                          <Button variant="outline" className="flex-1">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Xem lý do hủy
                          </Button>
                        )}

                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
