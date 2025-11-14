-- Create storage bucket for item photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('item-photos', 'item-photos', true);

-- Create policies for item photos
CREATE POLICY "Item photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'item-photos');

CREATE POLICY "Anyone can upload item photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'item-photos');

CREATE POLICY "Anyone can update their uploaded photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'item-photos');

CREATE POLICY "Anyone can delete item photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'item-photos');