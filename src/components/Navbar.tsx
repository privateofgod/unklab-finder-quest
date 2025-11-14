import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, MapPin, Home } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Search className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">UNKLAB Lost & Found</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/locations">
              <Button variant="ghost" size="sm" className="gap-2">
                <MapPin className="h-4 w-4" />
                Locations
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="ghost" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                Browse Items
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
