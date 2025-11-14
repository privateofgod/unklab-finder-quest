-- Create locations table
CREATE TABLE public.locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create items table for lost and found items
CREATE TABLE public.items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'lost', -- 'lost' or 'found'
  location_id UUID REFERENCES public.locations(id),
  image_url TEXT,
  contact_name TEXT NOT NULL,
  contact_info TEXT NOT NULL,
  reported_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Public read access for locations
CREATE POLICY "Locations are viewable by everyone" 
ON public.locations 
FOR SELECT 
USING (true);

-- Public read access for items
CREATE POLICY "Items are viewable by everyone" 
ON public.items 
FOR SELECT 
USING (true);

-- Allow anyone to insert items (public reporting)
CREATE POLICY "Anyone can report items" 
ON public.items 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_items_updated_at
BEFORE UPDATE ON public.items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert UNKLAB locations
INSERT INTO public.locations (name, code, description) VALUES
('GK1', 'GK1', 'Gedung Kuliah 1'),
('GK2', 'GK2', 'Gedung Kuliah 2'),
('GK3', 'GK3', 'Gedung Kuliah 3'),
('GA', 'GA', 'Gedung Administrasi'),
('PC', 'PC', 'Perpustakaan Central'),
('Jasmine Dormitory', 'JASMINE', 'Asrama Jasmine'),
('Eden Dormitory', 'EDEN', 'Asrama Eden'),
('Crystal Dormitory', 'CRYSTAL', 'Asrama Crystal'),
('Guest House', 'GUESTHOUSE', 'Guest House UNKLAB');