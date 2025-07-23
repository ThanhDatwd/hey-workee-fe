import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  User, 
  Settings, 
  PlusCircle, 
  List, 
  Menu, 
  X,
  Wrench,
  Users
} from "lucide-react";

interface NavigationProps {
  userType?: 'customer' | 'worker' | null;
}

function Navigation({ userType }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const customerMenuItems = [
    { icon: Home, label: "Trang chủ", path: "/" },
    { icon: PlusCircle, label: "Tạo yêu cầu", path: "/create-request" },
    { icon: List, label: "Yêu cầu của tôi", path: "/my-requests" },
    { icon: User, label: "Tài khoản", path: "/profile" },
  ];

  const workerMenuItems = [
    { icon: Home, label: "Trang chủ", path: "/worker-dashboard" },
    { icon: List, label: "Yêu cầu gần đây", path: "/worker-requests" },
    { icon: Settings, label: "Đơn hàng", path: "/worker-jobs" },
    { icon: User, label: "Tài khoản", path: "/worker-profile" },
  ];

  const menuItems = userType === 'worker' ? workerMenuItems : customerMenuItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border">
        <div className="mobile-container px-2 py-2">
          <div className="flex items-center justify-around">
            {menuItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors min-w-[60px] ${
                  isActive(item.path) 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
            
            {!userType && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl min-w-[60px]"
              >
                <Menu className="w-5 h-5" />
                <span className="text-xs font-medium">Menu</span>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && !userType && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)}>
            <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-semibold text-lg">Thợ Ơiii</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full mobile-button text-base font-medium">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full mobile-button text-base font-medium">
                    Đăng ký
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex bg-background border-b shadow-soft">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">
              Thợ Ơiii
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {!userType && (
              <div className="flex items-center gap-3 ml-4">
                <Link to="/login">
                  <Button variant="outline">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button>
                    Đăng ký
                  </Button>
                </Link>
              </div>
            )}

            {userType && (
              <div className="flex items-center gap-2 ml-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  {userType === 'worker' ? (
                    <Wrench className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Users className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {userType === 'worker' ? 'Thợ' : 'Khách hàng'}
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;