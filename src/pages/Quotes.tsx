import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigation } from "@/components/Navigation";
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone,
  MessageCircle,
  CheckCircle,
  Timer,
  Award
} from "lucide-react";

interface Quote {
  id: string;
  worker: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    completedJobs: number;
    distance: number;
    isVerified: boolean;
  };
  price: number;
  estimatedTime: string;
  description: string;
  warranty: string;
  createdAt: string;
}

const mockQuotes: Quote[] = [
  {
    id: '1',
    worker: {
      id: 'w1',
      name: 'Anh Minh Electrician',
      avatar: '/placeholder.svg',
      rating: 4.9,
      reviewCount: 127,
      completedJobs: 250,
      distance: 1.2,
      isVerified: true
    },
    price: 150000,
    estimatedTime: '30-45 phút',
    description: 'Thay bóng đèn LED chất lượng cao, kiểm tra hệ thống điện. Bảo hành 6 tháng.',
    warranty: '6 tháng',
    createdAt: '5 phút trước'
  },
  {
    id: '2',
    worker: {
      id: 'w2',
      name: 'Thợ Điện Quang',
      avatar: '/placeholder.svg',
      rating: 4.7,
      reviewCount: 89,
      completedJobs: 156,
      distance: 2.1,
      isVerified: true
    },
    price: 120000,
    estimatedTime: '45-60 phút',
    description: 'Thay bóng đèn + kiểm tra toàn bộ hệ thống an toàn điện trong nhà.',
    warranty: '3 tháng',
    createdAt: '8 phút trước'
  },
  {
    id: '3',
    worker: {
      id: 'w3',
      name: 'Điện lạnh Đức',
      avatar: '/placeholder.svg',
      rating: 4.8,
      reviewCount: 203,
      completedJobs: 334,
      distance: 0.8,
      isVerified: false
    },
    price: 180000,
    estimatedTime: '30 phút',
    description: 'Sử dụng bóng đèn chính hãng, tư vấn tiết kiệm điện. Bảo hành 1 năm.',
    warranty: '12 tháng',
    createdAt: '12 phút trước'
  }
];

export default function Quotes() {
  const navigate = useNavigate();
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  const handleSelectWorker = (quoteId: string) => {
    setSelectedQuote(quoteId);
    // Simulate API call
    setTimeout(() => {
      navigate('/job-tracking');
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userType="customer" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Báo giá từ thợ</h1>
            <p className="text-muted-foreground">
              Đã nhận được {mockQuotes.length} báo giá cho yêu cầu của bạn
            </p>
          </div>

          {/* Request Summary */}
          <Card className="shadow-soft mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Yêu cầu: Sửa điện</CardTitle>
              <CardDescription>
                Bóng đèn phòng khách bị chập chờn, cần thay mới...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>123 Nguyễn Văn A, Quận 1</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>15 phút trước</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quotes List */}
          <div className="space-y-6">
            {mockQuotes.map((quote) => (
              <Card 
                key={quote.id} 
                className={`shadow-soft transition-all hover:shadow-medium ${
                  selectedQuote === quote.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={quote.worker.avatar} />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                          {quote.worker.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{quote.worker.name}</h3>
                          {quote.worker.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Đã xác minh
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{quote.worker.rating}</span>
                            <span>({quote.worker.reviewCount} đánh giá)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            <span>{quote.worker.completedJobs} việc hoàn thành</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>Cách {quote.worker.distance}km</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Timer className="w-4 h-4" />
                            <span>{quote.estimatedTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{quote.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {formatPrice(quote.price)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Bảo hành {quote.warranty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <p className="text-sm">{quote.description}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 sm:flex-none"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 sm:flex-none"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Gọi điện
                    </Button>
                    <Button
                      onClick={() => handleSelectWorker(quote.id)}
                      disabled={selectedQuote !== null}
                      className="flex-1"
                    >
                      {selectedQuote === quote.id ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Đã chọn
                        </>
                      ) : (
                        'Chọn thợ này'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tips */}
          <Card className="shadow-soft mt-8 border-blue-200 bg-blue-50/50">
            <CardContent className="pt-6">
              <h4 className="font-medium text-blue-900 mb-3">💡 Mẹo chọn thợ:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Ưu tiên thợ có đánh giá cao và nhiều công việc hoàn thành</li>
                <li>• Kiểm tra khoảng cách để tiết kiệm thời gian chờ đợi</li>
                <li>• Đọc kỹ mô tả dịch vụ và thời gian bảo hành</li>
                <li>• Có thể chat hoặc gọi điện để trao đổi thêm</li>
              </ul>
            </CardContent>
          </Card>

          {/* Back Button */}
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/waiting-response')}
            >
              Quay lại
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}