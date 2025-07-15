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
      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-background border-b shadow-soft">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">
              ThợGần
            </span>
          </Link>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t bg-card animate-slide-up">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors ${
                  isActive(item.path) 
                    ? "bg-accent text-accent-foreground border-r-2 border-primary" 
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {!userType && (
              <div className="border-t p-4 space-y-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="w-full">
                    Đăng ký
                  </Button>
                </Link>
              </div>
            )}
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
              ThợGần
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