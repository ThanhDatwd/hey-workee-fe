import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  MessageCircle
} from "lucide-react";

interface Request {
  id: string;
  service: string;
  description: string;
  address: string;
  createdAt: string;
  status: 'waiting' | 'quoted' | 'in_progress' | 'completed' | 'cancelled';
  price?: number;
  quotesCount?: number;
  workerName?: string;
  rating?: number;
}

const mockRequests: Request[] = [
  {
    id: '001',
    service: 'Sửa điện',
    description: 'Bóng đèn phòng khách bị chập chờn, cần thay mới. Trần nhà cao khoảng 3m...',
    address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    createdAt: '2024-01-15 14:30',
    status: 'completed',
    price: 150000,
    workerName: 'Anh Minh Electrician',
    rating: 5
  },
  {
    id: '002',
    service: 'Sửa nước',
    description: 'Vòi nước bếp bị rỉ nước, áp lực yếu. Cần kiểm tra và sửa chữa.',
    address: '456 Lê Văn B, Quận 3, TP.HCM',
    createdAt: '2024-01-14 09:15',
    status: 'quoted',
    quotesCount: 3
  },
  {
    id: '003',
    service: 'Điều hòa',
    description: 'Điều hòa không lạnh, có thể do hết gas. Cần thợ đến kiểm tra.',
    address: '789 Trần Văn C, Quận 7, TP.HCM',
    createdAt: '2024-01-13 16:45',
    status: 'in_progress',
    price: 200000,
    workerName: 'Thợ Điều Hòa Nam'
  },
  {
    id: '004',
    service: 'Sửa chữa tổng hợp',
    description: 'Cửa phòng ngủ bị kẹt, khó đóng mở. Cần điều chỉnh bản lề.',
    address: '321 Nguyễn Văn D, Quận 5, TP.HCM',
    createdAt: '2024-01-12 11:20',
    status: 'waiting'
  }
];

const statusConfig = {
  waiting: { label: 'Đang chờ', color: 'bg-yellow-100 text-yellow-800' },
  quoted: { label: 'Có báo giá', color: 'bg-blue-100 text-blue-800' },
  in_progress: { label: 'Đang thực hiện', color: 'bg-orange-100 text-orange-800' },
  completed: { label: 'Hoàn thành', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Đã huỷ', color: 'bg-gray-100 text-gray-800' }
};

export default function MyRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      all: mockRequests.length,
      waiting: mockRequests.filter(r => r.status === 'waiting').length,
      quoted: mockRequests.filter(r => r.status === 'quoted').length,
      in_progress: mockRequests.filter(r => r.status === 'in_progress').length,
      completed: mockRequests.filter(r => r.status === 'completed').length,
    };
  };

  const statusCounts = getStatusCounts();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="customer" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Yêu cầu của tôi</h1>
              <p className="text-muted-foreground">
                Quản lý tất cả yêu cầu dịch vụ của bạn
              </p>
            </div>
            <Link to="/create-request">
              <Button size="lg" className="mt-4 md:mt-0">
                Tạo yêu cầu mới
              </Button>
            </Link>
          </div>

          {/* Search and Filter */}
          <Card className="shadow-soft mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm theo dịch vụ hoặc mô tả..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Button variant="outline" className="h-12 px-6">
                  <Filter className="w-4 h-4 mr-2" />
                  Lọc
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Tabs */}
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="relative">
                Tất cả
                <Badge variant="secondary" className="ml-2 text-xs">
                  {statusCounts.all}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="waiting" className="relative">
                Chờ báo giá
                <Badge variant="secondary" className="ml-2 text-xs">
                  {statusCounts.waiting}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="quoted" className="relative">
                Có báo giá
                <Badge variant="secondary" className="ml-2 text-xs">
                  {statusCounts.quoted}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="in_progress" className="relative">
                Đang làm
                <Badge variant="secondary" className="ml-2 text-xs">
                  {statusCounts.in_progress}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="relative">
                Hoàn thành
                <Badge variant="secondary" className="ml-2 text-xs">
                  {statusCounts.completed}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={statusFilter} className="space-y-4">
              {filteredRequests.length === 0 ? (
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center py-12">
                    <div className="text-muted-foreground mb-4">
                      <Calendar className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Không có yêu cầu nào</h3>
                      <p>
                        {statusFilter === 'all' 
                          ? 'Bạn chưa tạo yêu cầu nào'
                          : `Không có yêu cầu nào ở trạng thái ${statusConfig[statusFilter as keyof typeof statusConfig]?.label.toLowerCase()}`
                        }
                      </p>
                    </div>
                    <Link to="/create-request">
                      <Button>Tạo yêu cầu đầu tiên</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                filteredRequests.map((request) => (
                  <Card key={request.id} className="shadow-soft hover:shadow-medium transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg">{request.service}</CardTitle>
                            <Badge className={statusConfig[request.status].color}>
                              {statusConfig[request.status].label}
                            </Badge>
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
                                <span className="text-sm font-medium">{request.rating}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm line-clamp-2">{request.description}</p>
                      
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

                      {request.workerName && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">Thợ:</span>
                          <span className="font-medium">{request.workerName}</span>
                        </div>
                      )}

                      {request.quotesCount && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">Báo giá:</span>
                          <Badge variant="outline">{request.quotesCount} báo giá</Badge>
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        {request.status === 'quoted' && (
                          <Link to="/quotes" className="flex-1">
                            <Button className="w-full">
                              Xem báo giá ({request.quotesCount})
                            </Button>
                          </Link>
                        )}
                        
                        {request.status === 'in_progress' && (
                          <Link to="/job-tracking" className="flex-1">
                            <Button className="w-full">
                              Theo dõi công việc
                            </Button>
                          </Link>
                        )}

                        {request.status === 'completed' && (
                          <Link to="/job-tracking" className="flex-1">
                            <Button variant="outline" className="w-full">
                              <Eye className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </Button>
                          </Link>
                        )}

                        {request.status === 'waiting' && (
                          <Button variant="outline" className="flex-1">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Liên hệ hỗ trợ
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