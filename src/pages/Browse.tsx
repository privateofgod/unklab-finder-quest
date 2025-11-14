import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { format } from "date-fns";

const Browse = () => {
  const [activeTab, setActiveTab] = useState("all");

  const { data: items, isLoading } = useQuery({
    queryKey: ['items', activeTab],
    queryFn: async () => {
      let query = supabase
        .from('items')
        .select(`
          *,
          locations (
            name,
            code
          )
        `)
        .order('created_at', { ascending: false });

      if (activeTab !== 'all') {
        query = query.eq('status', activeTab);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Browse Items</h1>
          <p className="text-muted-foreground">
            View all lost and found items reported on campus
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="lost">Lost</TabsTrigger>
            <TabsTrigger value="found">Found</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
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
                className="shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all border-2"
              >
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
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-foreground font-medium">
                        {item.locations?.name} ({item.locations?.code})
                      </span>
                    </div>
                    
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
            <CardDescription className="text-lg">
              No items reported yet. Be the first to help the community!
            </CardDescription>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Browse;
