import { useState } from "react";
import { Package, Clock, CheckCircle, DollarSign, Star, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const WorkerJobs = () => {
  const { toast } = useToast();

  const jobs = {
    quoted: [
      {
        id: 1,
        service: "Sửa điện",
        customer: "Anh Minh",
        location: "Quận 1, TP.HCM",
        quotedPrice: "350,000đ",
        time: "2 giờ trước",
        status: "Chờ phản hồi"
      },
      {
        id: 2,
        service: "Vệ sinh điều hòa", 
        customer: "Chị Lan",
        location: "Quận 3, TP.HCM",
        quotedPrice: "250,000đ",
        time: "5 giờ trước",
        status: "Chờ phản hồi"
      }
    ],
    accepted: [
      {
        id: 3,
        service: "Sửa nước",
        customer: "Anh Tuấn",
        location: "Quận 7, TP.HCM",
        price: "200,000đ",
        startTime: "14:00 hôm nay",
        estimatedCompletion: "2-3 giờ",
        phone: "0901234567"
      }
    ],
    completed: [
      {
        id: 4,
        service: "Thông tắc cống",
        customer: "Chị Hoa",
        location: "Quận 1, TP.HCM",
        price: "180,000đ",
        completedDate: "Hôm qua",
        rating: 5,
        income: "162,000đ"
      },
      {
        id: 5,
        service: "Sửa máy giặt",
        customer: "Anh Nam",
        location: "Quận 2, TP.HCM", 
        price: "300,000đ",
        completedDate: "2 ngày trước",
        rating: 4,
        income: "270,000đ"
      },
      {
        id: 6,
        service: "Lắp đặt thiết bị",
        customer: "Chị Mai",
        location: "Quận 5, TP.HCM",
        price: "400,000đ", 
        completedDate: "3 ngày trước",
        rating: 5,
        income: "360,000đ"
      }
    ]
  };

  const totalIncome = jobs.completed.reduce((sum, job) => {
    return sum + parseInt(job.income.replace(/[^\d]/g, ''));
  }, 0);

  const handleMarkComplete = (jobId: number) => {
    toast({
      title: "Đánh dấu hoàn thành",
      description: "Công việc đã được đánh dấu hoàn thành",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navigation userType="worker" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Quản lý đơn hàng</h1>
          <p className="text-muted-foreground">Theo dõi báo giá, công việc và thu nhập của bạn</p>
        </div>

        {/* Income Summary */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{jobs.quoted.length}</p>
                <p className="text-sm text-muted-foreground">Đã báo giá</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{jobs.accepted.length}</p>
                <p className="text-sm text-muted-foreground">Đang thực hiện</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{jobs.completed.length}</p>
                <p className="text-sm text-muted-foreground">Đã hoàn thành</p>
              </div>
              <div className="text-center">
                <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{totalIncome.toLocaleString()}đ</p>
                <p className="text-sm text-muted-foreground">Thu nhập tuần</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Tabs */}
        <Tabs defaultValue="quoted" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quoted">Đã báo giá ({jobs.quoted.length})</TabsTrigger>
            <TabsTrigger value="accepted">Đang làm ({jobs.accepted.length})</TabsTrigger>
            <TabsTrigger value="completed">Hoàn thành ({jobs.completed.length})</TabsTrigger>
          </TabsList>

          {/* Quoted Jobs */}
          <TabsContent value="quoted" className="space-y-4">
            {jobs.quoted.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{job.service}</h3>
                      <p className="text-muted-foreground">{job.customer} • {job.location}</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                      {job.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Báo giá: <span className="font-semibold text-primary">{job.quotedPrice}</span></p>
                      <p className="text-sm text-muted-foreground">{job.time}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Xem chi tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Accepted Jobs */}
          <TabsContent value="accepted" className="space-y-4">
            {jobs.accepted.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{job.service}</h3>
                      <p className="text-muted-foreground">{job.customer} • {job.location}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Đang thực hiện
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Giá: <span className="font-semibold text-primary">{job.price}</span></p>
                      <p className="text-sm text-muted-foreground">Bắt đầu: {job.startTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dự kiến: {job.estimatedCompletion}</p>
                      <p className="text-sm text-muted-foreground">SĐT: {job.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Liên hệ
                    </Button>
                    <Button size="sm" onClick={() => handleMarkComplete(job.id)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Hoàn thành
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Completed Jobs */}
          <TabsContent value="completed" className="space-y-4">
            {jobs.completed.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{job.service}</h3>
                      <p className="text-muted-foreground">{job.customer} • {job.location}</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                      Hoàn thành
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Giá gốc: {job.price}</p>
                      <p className="text-sm font-semibold text-green-600">Thu nhập: {job.income}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hoàn thành: {job.completedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Đánh giá:</p>
                      <div className="flex items-center gap-1">
                        {renderStars(job.rating)}
                        <span className="text-sm text-muted-foreground ml-1">({job.rating}/5)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkerJobs;