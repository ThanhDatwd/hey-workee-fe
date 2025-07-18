import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Zap, Droplet, Wind, Wrench, MapPin, Camera, Upload, X, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jobServiceService } from "@/services/serviceService";
import { jobService } from "@/services/jobService";



const CUSTOMER_ID="409dd430-11cf-4f86-bccf-ee4ef5e6e6e1"
// Định nghĩa interface cho service
interface Service {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  imageUrl: string;
}

// Định nghĩa interface cho media
interface Media {
  file: File;
  url: string;
  type: "image" | "video";
}

// Định nghĩa schema validation với zod
const jobRequestSchema = z.object({
  serviceId: z.string().min(1, "Vui lòng chọn loại dịch vụ"),
  description: z.string().min(1, "Vui lòng nhập mô tả công việc"),
  address: z.string().optional(),
  locationLat: z.number().nullable().optional(),
  locationLng: z.number().nullable().optional(),
  media: z.array(z.string()).optional(),
  radius: z.number().min(1, "Bán kính phải lớn hơn 0").default(5),
});

type JobRequestForm = z.infer<typeof jobRequestSchema>;

export default function CreateRequest() {
  const navigate = useNavigate();
  const [media, setMedia] = useState<Media[]>([]);
  const [locationError, setLocationError] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);

  // Khởi tạo form với react-hook-form và zod
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JobRequestForm>({
    resolver: zodResolver(jobRequestSchema),
    defaultValues: {
      serviceId: "",
      description: "",
      address: "",
      locationLat: null,
      locationLng: null,
      radius: 5,
      media: [],
    },
  });

  const selectedService = watch("serviceId");
  const selectedServiceData = services.find((s) => s.id === selectedService);

  // Xử lý upload file (hình ảnh hoặc video)
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const validVideoTypes = ["video/mp4", "video/mov"];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const maxFiles = 5; // Tối đa 5 file

    if (media.length + files.length > maxFiles) {
      alert(`Tối đa chỉ được upload ${maxFiles} file!`);
      return;
    }

    const newMedia: Media[] = files
      .filter((file) => {
        if (file.size > maxSize) {
          alert(`File ${file.name} vượt quá kích thước 10MB!`);
          return false;
        }
        return validImageTypes.includes(file.type) || validVideoTypes.includes(file.type);
      })
      .map((file: File) => ({
        file,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("image") ? ("image" as const) : ("video" as const),
      }));

    setMedia((prev) => [...prev, ...newMedia]);
    setValue("media", [...media, ...newMedia].map((m) => m.url));
  };

  // Xử lý xóa media
  const handleRemoveMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
    setValue("media", media.filter((_, i) => i !== index).map((m) => m.url));
  };

  // Lấy vị trí hiện tại
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("locationLat", position.coords.latitude);
          setValue("locationLng", position.coords.longitude);
          setLocationError("");
        },
        (error) => {
          setLocationError("Không thể lấy vị trí. Vui lòng nhập địa chỉ thủ công.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setLocationError("Trình duyệt không hỗ trợ định vị.");
    }
  };

  // Gửi yêu cầu công việc
  const onSubmit: SubmitHandler<JobRequestForm> = async (data) => {
    // Chuẩn bị dữ liệu gửi API
  const jobRequest = {
      customerId: CUSTOMER_ID,
      serviceId: data.serviceId,
      description: data.description,
      locationLat: data.locationLat,
      locationLng: data.locationLng,
      address: data.address,
      radius: data.radius,
    }
    try {
      // Gọi API (dựa trên code Spring Boot)
      const response = await jobService.createJobRequest(jobRequest);


      navigate("/waiting-response");
    } catch (error) {
      alert("Lỗi khi gửi yêu cầu: " + (error as Error).message);
    }
  };

    // fetch services from API

  const fetchServices = async () => {
    try {
      // Mock data for demo purposes to avoid network errors
      const mockServices = [
        {
          id: "1",
          name: "Điện lạnh",
          icon: Zap,
          description: "Sửa chữa điều hòa, tủ lạnh",
          imageUrl: ""
        },
        {
          id: "2", 
          name: "Điện nước",
          icon: Droplet,
          description: "Sửa chữa hệ thống điện, nước",
          imageUrl: ""
        },
        {
          id: "3",
          name: "Sơn sửa",
          icon: Wind,
          description: "Sơn nhà, sửa chữa nội thất", 
          imageUrl: ""
        },
        {
          id: "4",
          name: "Vệ sinh",
          icon: Wrench,
          description: "Dọn dẹp, vệ sinh nhà cửa",
          imageUrl: ""
        }
      ];
      
      setServices(mockServices);
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation userType="customer" />

      <div className="container mx-auto px-4 py-6 max-w-sm lg:max-w-3xl">
          <div className="lg:max-w-3xl lg:mx-auto">
            <div className="text-center mb-6 px-2">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-foreground">Tạo yêu cầu công việc</h1>
              <p className="text-muted-foreground text-sm lg:text-base">
                Mô tả chi tiết công việc để nhận được báo giá chính xác nhất
              </p>
            </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-8">
            {/* Service Selection */}
            <Card className="rounded-3xl shadow-medium border-0 lg:border lg:shadow-soft bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  Chọn loại dịch vụ
                </CardTitle>
                <CardDescription className="text-base">Chọn dịch vụ phù hợp với nhu cầu của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setValue("serviceId", service.id)}
                      className={`
                        p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg lg:p-4
                        ${selectedService === service.id ? "border-primary bg-primary/10 shadow-medium transform scale-[1.02]" : "border-border/50 hover:border-primary/50 bg-card"}
                      `}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center flex-shrink-0 shadow-soft`}>
                          <service.icon className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`font-bold mb-2 text-lg lg:text-base ${
                              selectedService === service.id ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {service.name}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" className="text-sm py-1 px-3 rounded-full">
                                {service.description}
                              </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.serviceId && (
                  <p className="text-sm text-red-500 mt-2">{errors.serviceId.message}</p>
                )}

                {/* {selectedServiceData && (
                  <div className="mt-4 p-4 bg-accent/50 rounded-lg">
                    <h4 className="font-medium mb-2">Các công việc phổ biến:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedServiceData.examples.map((example, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        >
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )} */}
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="rounded-3xl shadow-medium border-0 lg:border lg:shadow-soft bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Mô tả công việc
                </CardTitle>
                <CardDescription>Mô tả chi tiết vấn đề và yêu cầu của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Chi tiết công việc *</Label>
                  <Textarea
                    id="description"
                    placeholder="Ví dụ: Bóng đèn phòng khách bị chập chờn, cần thay mới. Trần nhà cao khoảng 3m..."
                    {...register("description")}
                    className="resize-none"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Hình ảnh hoặc video (tuỳ chọn)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center hover:border-primary/50 transition-colors">
                    <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                      Chụp ảnh hoặc quay video để thợ hiểu rõ hơn về vấn đề
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif,video/mp4,video/mov"
                      multiple
                      onChange={handleMediaUpload}
                      className="hidden"
                      id="media-upload"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <label htmlFor="media-upload">
                        <Upload className="w-4 h-4 mr-2" />
                        Chọn ảnh hoặc video
                      </label>
                    </Button>
                  </div>

                  {media.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                      {media.map((item, index) => (
                        <div key={index} className="relative group">
                          {item.type === "image" ? (
                            <img
                              src={item.url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-16 sm:h-20 object-cover rounded-lg"
                            />
                          ) : (
                            <video
                              src={item.url}
                              controls
                              className="w-full h-16 sm:h-20 object-cover rounded-lg"
                            />
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveMedia(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="rounded-3xl shadow-medium border-0 lg:border lg:shadow-soft bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Địa chỉ thực hiện
                </CardTitle>
                <CardDescription>Cung cấp địa chỉ chính xác để thợ có thể đến</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ chi tiết </Label>
                  <Input
                    id="address"
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, thành phố"
                    {...register("address")}
                    className="h-10 sm:h-12"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="radius">Bán kính tìm thợ (km)</Label>
                  <Select
                    onValueChange={(value) => setValue("radius", parseInt(value))}
                    defaultValue="5"
                  >
                    <SelectTrigger id="radius">
                      <SelectValue placeholder="Chọn bán kính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 km</SelectItem>
                      <SelectItem value="10">10 km</SelectItem>
                      <SelectItem value="15">15 km</SelectItem>
                      <SelectItem value="20">20 km</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.radius && (
                    <p className="text-sm text-red-500">{errors.radius.message}</p>
                  )}
                </div>

                {watch("locationLat") && watch("locationLng") && (
                  <div className="text-sm text-muted-foreground">
                    Vị trí: ({watch("locationLat")?.toFixed(6)}, {watch("locationLng")?.toFixed(6)})
                  </div>
                )}
                {locationError && (
                  <div className="text-sm text-red-500">{locationError}</div>
                )}

                <Button type="button" variant="outline" className="w-full h-10 sm:h-auto text-sm sm:text-base" onClick={handleGetLocation}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Sử dụng vị trí hiện tại
                </Button>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Card className="rounded-3xl shadow-medium border-0 lg:border lg:shadow-soft bg-card">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:gap-4 lg:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="w-full lg:w-auto h-12 lg:h-auto text-base lg:text-sm font-medium"
                  >
                    Huỷ bỏ
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="w-full lg:w-auto h-12 lg:h-auto text-base lg:text-sm font-medium">
                    {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
                  </Button>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4 text-center px-2">
                  Sau khi gửi yêu cầu, hệ thống sẽ tự động tìm thợ phù hợp trong khu vực của bạn
                </p>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}