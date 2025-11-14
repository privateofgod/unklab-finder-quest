import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import gk1 from "@/assets/gk1.jpg";
import library from "@/assets/library.jpg";
import dormitory from "@/assets/dormitory.jpg";

const getLocationImage = (code: string) => {
  if (code.startsWith('GK') || code === 'GA') return gk1;
  if (code === 'PC') return library;
  if (code.includes('JASMINE') || code.includes('EDEN') || code.includes('CRYSTAL') || code.includes('GUESTHOUSE')) return dormitory;
  return gk1;
};

const Locations = () => {
  const { data: locations, isLoading } = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: itemCounts } = useQuery({
    queryKey: ['location-item-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('items')
        .select('location_id');
      
      if (error) throw error;
      
      // Count items per location
      const counts: Record<string, number> = {};
      data.forEach(item => {
        if (item.location_id) {
          counts[item.location_id] = (counts[item.location_id] || 0) + 1;
        }
      });
      
      return counts;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Campus Locations</h1>
          <p className="text-muted-foreground">
            Browse items by specific buildings and facilities across UNKLAB campus
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted"></div>
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations?.map((location) => {
              const itemCount = itemCounts?.[location.id] || 0;
              return (
                <Link key={location.id} to={`/location/${location.id}`}>
                  <Card 
                    className="overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all cursor-pointer border-2 group"
                  >
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img 
                        src={getLocationImage(location.code)} 
                        alt={location.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                          <MapPin className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="text-white font-semibold text-lg">{location.code}</span>
                      </div>
                      {itemCount > 0 && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-primary text-primary-foreground">
                            {itemCount} item{itemCount !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-foreground">{location.name}</CardTitle>
                      <CardDescription>{location.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Locations;
