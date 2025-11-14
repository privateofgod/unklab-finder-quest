import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Phone, PackageOpen, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { format } from "date-fns";
import gk1 from "@/assets/gk1.jpg";
import library from "@/assets/library.jpg";
import dormitory from "@/assets/dormitory.jpg";

const getLocationImage = (code: string) => {
  if (code.startsWith('GK') || code === 'GA') return gk1;
  if (code === 'PC') return library;
  if (code.includes('JASMINE') || code.includes('EDEN') || code.includes('CRYSTAL') || code.includes('GUESTHOUSE')) return dormitory;
  return gk1;
};

const LocationItems = () => {
  const { locationId } = useParams();

  const { data: location } = useQuery({
    queryKey: ['location', locationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('id', locationId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: items, isLoading } = useQuery({
    queryKey: ['location-items', locationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('location_id', locationId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <Link to="/locations">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Locations
          </Button>
        </Link>

        {location && (
          <div className="mb-8">
            <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              <img 
                src={getLocationImage(location.code)} 
                alt={location.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <h1 className="text-4xl font-bold text-white mb-2">{location.name}</h1>
                  <p className="text-white/90">{location.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Items at this Location
          </h2>
          <p className="text-muted-foreground">
            {items?.length || 0} item(s) reported
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted"></div>
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : items && items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all border-2"
              >
                {item.image_url && (
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!item.image_url && (
                  <div className="relative h-48 bg-muted flex items-center justify-center">
                    <PackageOpen className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <Badge 
                      variant={item.status === 'lost' ? 'destructive' : 'default'}
                      className={item.status === 'found' ? 'bg-success text-success-foreground' : ''}
                    >
                      {item.status === 'lost' ? 'Lost' : 'Found'}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {item.category}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(item.reported_date), 'MMM dd, yyyy')}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-accent" />
                      <div>
                        <div className="font-medium text-foreground">{item.contact_name}</div>
                        <div className="text-muted-foreground">{item.contact_info}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <PackageOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <CardDescription className="text-lg">
              No items reported at this location yet.
            </CardDescription>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LocationItems;
