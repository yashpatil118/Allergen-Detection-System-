
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Carrot, Camera, Pencil, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/layouts/DashboardLayout';

const FoodType = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [analysisResult, setAnalysisResult] = useState<null | {
    allergens: string[];
    severity: 'low' | 'medium' | 'high';
  }>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const processBarcode = () => {
    if (!selectedImage) {
      toast({
        title: 'No image selected',
        description: 'Please upload a barcode image first.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulated processing time
    setTimeout(() => {
      // Mock analysis result
      setAnalysisResult({
        allergens: ['Peanuts', 'Milk', 'Soy'],
        severity: 'medium',
      });
      
      setIsProcessing(false);
      
      toast({
        title: 'Barcode processed',
        description: 'Analysis complete. Potential allergens detected.',
      });
    }, 2000);
  };

  const analyzeIngredients = () => {
    if (!foodName || !ingredients) {
      toast({
        title: 'Incomplete information',
        description: 'Please provide both food name and ingredients.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulated processing time
    setTimeout(() => {
      // Extract allergies from localStorage (this would match with a backend in a real app)
      const allergies = localStorage.getItem('allergies') || '';
      const allergensArray = allergies.toLowerCase().split(',').map(a => a.trim());
      
      // Simulate finding allergens in ingredients
      const foundAllergens = [];
      for (const allergen of allergensArray) {
        if (allergen && ingredients.toLowerCase().includes(allergen)) {
          foundAllergens.push(allergen.charAt(0).toUpperCase() + allergen.slice(1));
        }
      }
      
      // If no specific allergens found but we have some to check against
      if (foundAllergens.length === 0 && allergensArray.length > 0 && allergensArray[0] !== '') {
        foundAllergens.push('Trace amounts possible');
      }
      
      // If we don't have any allergies stored
      if (foundAllergens.length === 0) {
        foundAllergens.push('Generic allergen warning');
      }
      
      // Determine severity based on number of allergens found
      let severity: 'low' | 'medium' | 'high' = 'low';
      if (foundAllergens.length > 2) {
        severity = 'high';
      } else if (foundAllergens.length > 0) {
        severity = 'medium';
      }
      
      setAnalysisResult({
        allergens: foundAllergens,
        severity,
      });
      
      setIsProcessing(false);
      
      toast({
        title: 'Analysis complete',
        description: foundAllergens.length > 0 
          ? 'Potential allergens detected in this food.' 
          : 'No allergens detected based on your profile.',
      });
    }, 1500);
  };

  return (
    <DashboardLayout title="Food Type Analysis">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs defaultValue="packaged" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="packaged" className="text-base">
              <Package className="mr-2 h-4 w-4" /> Packaged Food
            </TabsTrigger>
            <TabsTrigger value="non-packaged" className="text-base">
              <Carrot className="mr-2 h-4 w-4" /> Non-Packaged Food
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="packaged" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Barcode Scanner</CardTitle>
                <CardDescription>
                  Upload a photo of the barcode to analyze the food's ingredients
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-lg p-6 bg-primary/5">
                  {selectedImage ? (
                    <div className="space-y-4 w-full">
                      <div className="relative aspect-video max-w-md mx-auto">
                        <img 
                          src={selectedImage} 
                          alt="Uploaded barcode" 
                          className="rounded-md object-contain max-h-48 mx-auto"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Button onClick={() => setSelectedImage(null)} variant="outline">
                          Remove
                        </Button>
                        <Button onClick={processBarcode} disabled={isProcessing}>
                          {isProcessing ? 'Processing...' : 'Process Barcode'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="h-12 w-12 text-primary/40 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload Barcode</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Take a clear photo of the product's barcode
                      </p>
                      <Label 
                        htmlFor="barcode-upload" 
                        className="cursor-pointer bg-primary/10 hover:bg-primary/20 transition-colors px-4 py-2 rounded-md text-primary font-medium"
                      >
                        Select Image
                      </Label>
                      <Input 
                        id="barcode-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="non-packaged" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manual Input</CardTitle>
                <CardDescription>
                  Enter food details manually for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="food-name">Food Name</Label>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Pencil className="text-muted-foreground h-4 w-4" />
                      <Input
                        id="food-name"
                        placeholder="Enter food name"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="ingredients">Ingredients</Label>
                    <Textarea
                      id="ingredients"
                      placeholder="List the ingredients, separated by commas"
                      className="h-24 mt-1.5"
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="symptoms">Symptoms (if any)</Label>
                    <Textarea
                      id="symptoms"
                      placeholder="Describe any symptoms experienced after consuming this food"
                      className="h-24 mt-1.5"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={analyzeIngredients}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Analyzing...' : 'Analyze Ingredients'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <Card className={`border-l-4 ${
              analysisResult.severity === 'high' 
                ? 'border-l-red-500 bg-red-50/50'
                : analysisResult.severity === 'medium'
                  ? 'border-l-amber-500 bg-amber-50/50'
                  : 'border-l-green-500 bg-green-50/50'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className={`h-5 w-5 ${
                    analysisResult.severity === 'high' 
                      ? 'text-red-500'
                      : analysisResult.severity === 'medium'
                        ? 'text-amber-500'
                        : 'text-green-500'
                  }`} />
                  Allergen Analysis Result
                </CardTitle>
                <CardDescription>
                  {analysisResult.severity === 'high' 
                    ? 'High risk of allergic reaction'
                    : analysisResult.severity === 'medium'
                      ? 'Moderate risk of allergic reaction'
                      : 'Low risk of allergic reaction'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium">Detected Allergens:</h3>
                    <ul className="list-disc list-inside ml-1 mt-1 space-y-1">
                      {analysisResult.allergens.map((allergen, index) => (
                        <li key={index} className="text-sm">
                          {allergen}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-background/80 p-3 rounded-md mt-4">
                    <h3 className="text-sm font-medium mb-1">Recommendation:</h3>
                    <p className="text-sm">
                      {analysisResult.severity === 'high' 
                        ? 'Avoid this food. It contains allergens that may cause severe reactions based on your profile.'
                        : analysisResult.severity === 'medium'
                          ? 'Exercise caution with this food. It contains some allergens that may cause reactions.'
                          : 'This food appears relatively safe, but always be cautious with new foods.'}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // Save analysis to localStorage for report generation
                    const savedAnalyses = JSON.parse(localStorage.getItem('foodAnalyses') || '[]');
                    savedAnalyses.push({
                      date: new Date().toISOString(),
                      foodName: foodName || 'Scanned Product',
                      allergens: analysisResult.allergens,
                      severity: analysisResult.severity,
                    });
                    localStorage.setItem('foodAnalyses', JSON.stringify(savedAnalyses));
                    
                    toast({
                      title: 'Analysis saved',
                      description: 'This analysis has been saved for your report.',
                    });
                  }}
                >
                  Save Analysis
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default FoodType;
