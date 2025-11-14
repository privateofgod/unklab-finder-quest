import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Package, MapPin, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="UNKLAB Campus" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Lost Something? Found Something?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              UNKLAB's trusted platform to reunite lost items with their owners
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/report-lost">
                <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all">
                  <Search className="h-5 w-5" />
                  Report Lost Item
                </Button>
              </Link>
              <Link to="/report-found">
                <Button size="lg" variant="outline" className="gap-2 shadow-lg hover:shadow-xl transition-all border-2">
                  <Package className="h-5 w-5" />
                  Report Found Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all border-2">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Easy Reporting</CardTitle>
              <CardDescription>
                Quickly report lost or found items with detailed descriptions and photos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all border-2">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Location-Based</CardTitle>
              <CardDescription>
                Browse items by specific campus locations - dorms, buildings, and facilities
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all border-2">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10 mb-4">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <CardTitle>Quick Reunions</CardTitle>
              <CardDescription>
                Connect directly with finders or owners to reunite items quickly and safely
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Browse by Location</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            View all campus buildings and facilities where items have been lost or found
          </p>
          <Link to="/locations">
            <Button size="lg" className="gap-2">
              <MapPin className="h-5 w-5" />
              View All Locations
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
