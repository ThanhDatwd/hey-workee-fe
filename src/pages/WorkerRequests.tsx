import { useState, useEffect } from "react";
import { MapPin, Clock, Filter, Search, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { Client } from "@stomp/stompjs";
import { jobService } from "@/services/jobService";

const WorkerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [quoteData, setQuoteData] = useState({
    amount: "",
    estimatedTime: "",
    note: "",
  });

  // Worker ID (giả định, thay bằng ID thực từ context hoặc auth)
  const workerId = "defbd834-8af8-42d2-9a8c-74d001327505";

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await jobService.getJobMatchesByWorker({
          workerId,
          pageSize: 100,
          pageNumber: 0,
        });
        const data = response.data.content || [];
        setRequests(data);
      } catch (error) {
        console.error("Lỗi:", error.message);
      }
    };

    fetchRequests();
  }, [workerId]);

  // Thiết lập WebSocket với STOMP
useEffect(() => {
  const client = new Client({
    brokerURL: "ws://192.168.1.154:8080/job-here/ws", // URL WebSocket đã đúng
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    debug: (str) => console.log("STOMP Debug:", str), // Debug STOMP
  });

  // Tạo đối tượng Audio để phát âm thanh
  const notificationSound = new Audio("/audio/thong-bao-nhan-don.mp3");

  client.onConnect = () => {
    console.log("Đã kết nối WebSocket");
    const topic = `/topic/job-notifications/${workerId}`;
    console.log("Subscribe topic:", topic);
    client.subscribe(topic, (message) => {
      try {
        const newRequest = JSON.parse(message.body);
        console.log("Nhận được đơn hàng mới:", newRequest); // Debug dữ liệu
        setRequests((prev) => [newRequest, ...prev]); // Thêm đơn hàng mới
        // Phát âm thanh thông báo
        notificationSound.play().catch((error) => {
          console.error("Lỗi khi phát âm thanh thông báo:", error);
        });
      } catch (error) {
        console.error("Lỗi khi parse thông điệp WebSocket:", error);
      }
    });
  };

  client.onStompError = (frame) => {
    console.error("Lỗi STOMP:", frame);
  };

  client.onWebSocketError = (error) => {
    console.error("Lỗi WebSocket:", error);
  };

  client.activate();

  // Cleanup khi component unmount
  return () => {
    client.deactivate();
    console.log("Đã ngắt kết nối WebSocket");
  };
}, [workerId]);



  // Logic lọc (cập nhật để dùng customerName và status thay vì service)
  const filteredRequests = requests?.filter((request) => {
    const matchesDistance =
      selectedDistance === "all" ||
      (selectedDistance === "1km" && request.radius <= 1) ||
      (selectedDistance === "2km" && request.radius <= 2) ||
      (selectedDistance === "5km" && request.radius <= 5);
    const matchesSearch =
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistance && matchesSearch;
  });


  const handleOpenQuoteModal = (requestId) => {
    setSelectedRequestId(requestId);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedRequestId(null);
    setQuoteData({ amount: "", estimatedTime: "", note: "" });
  };

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitQuote = async () => {
    if (!quoteData.amount || !quoteData.estimatedTime) {
      alert("Vui lòng nhập đầy đủ số tiền và thời gian hoàn thành!");
      return;
    }

    try {
      await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: selectedRequestId,
          workerId,
          ...quoteData,
        }),
      });
      alert("Báo giá đã được gửi!");
      handleCloseQuoteModal();
    } catch (error) {
      alert("Lỗi khi gửi báo giá: " + error.message);
    }
  };

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <h3 className="text-xl font-bold text-foreground">{request.status}</h3>
                    {request.status === "PENDING" && (
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Chờ xử lý</Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {new Date(request.matchedAt).toLocaleString("vi-VN")}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      {request.radius}km
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{request.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Khách hàng:</p>
                    <p className="text-sm text-muted-foreground">{request.customerName}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-1">Địa chỉ:</p>
                  <p className="text-sm text-muted-foreground">{request.address}</p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 md:flex-none">
                    <Eye className="w-4 h-4 mr-2" />
                    Xem chi tiết
                  </Button>
                  {request.status === "PENDING" && (
                    <Button
                      className="flex-1 md:flex-none"
                      onClick={() => handleOpenQuoteModal(request.id)}
                    >
                      Gửi báo giá
                    </Button>
                  )}
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

        {/* Quote Modal */}
        <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Gửi báo giá</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Số tiền (VND)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Nhập số tiền"
                  value={quoteData.amount}
                  onChange={handleQuoteChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estimatedTime">Thời gian hoàn thành</Label>
                <Input
                  id="estimatedTime"
                  name="estimatedTime"
                  placeholder="Ví dụ: 2 giờ, 1 ngày..."
                  value={quoteData.estimatedTime}
                  onChange={handleQuoteChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="note">Ghi chú</Label>
                <Textarea
                  id="note"
                  name="note"
                  placeholder="Thêm ghi chú cho báo giá..."
                  value={quoteData.note}
                  onChange={handleQuoteChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseQuoteModal}>
                Hủy
              </Button>
              <Button onClick={handleSubmitQuote}>Gửi báo giá</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default WorkerRequests;