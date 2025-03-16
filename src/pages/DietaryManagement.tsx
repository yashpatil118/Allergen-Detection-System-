
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Check, ExternalLink, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';

// Sample diet plan data that would come from a backend
const SAMPLE_DIET_PLANS = {
  'peanuts': {
    alternatives: ['Sunflower seed butter', 'Almond butter', 'Tahini (sesame seed paste)'],
    mealPlan: [
      {
        day: 'Monday',
        meals: [
          { name: 'Breakfast', items: ['Oatmeal with almond milk', 'Sliced bananas', 'Honey'] },
          { name: 'Lunch', items: ['Grilled chicken salad', 'Olive oil dressing', 'Fresh fruit'] },
          { name: 'Dinner', items: ['Baked salmon', 'Quinoa', 'Steamed vegetables'] },
          { name: 'Snack', items: ['Apple slices with sunflower seed butter'] },
        ]
      },
      {
        day: 'Tuesday',
        meals: [
          { name: 'Breakfast', items: ['Yogurt with berries', 'Granola (peanut-free)'] },
          { name: 'Lunch', items: ['Turkey and avocado wrap', 'Carrot sticks', 'Hummus'] },
          { name: 'Dinner', items: ['Beef stir-fry with broccoli', 'Brown rice'] },
          { name: 'Snack', items: ['Rice cakes with almond butter'] },
        ]
      },
    ],
    supplementation: ['Vitamin E', 'Niacin', 'Magnesium']
  },
  'milk': {
    alternatives: ['Almond milk', 'Oat milk', 'Coconut milk', 'Soy milk'],
    mealPlan: [
      {
        day: 'Monday',
        meals: [
          { name: 'Breakfast', items: ['Oatmeal with oat milk', 'Sliced bananas', 'Cinnamon'] },
          { name: 'Lunch', items: ['Grilled chicken salad', 'Olive oil dressing', 'Fresh fruit'] },
          { name: 'Dinner', items: ['Baked salmon', 'Quinoa', 'Steamed vegetables'] },
          { name: 'Snack', items: ['Dairy-free dark chocolate'] },
        ]
      },
      {
        day: 'Tuesday',
        meals: [
          { name: 'Breakfast', items: ['Avocado toast', 'Dairy-free smoothie'] },
          { name: 'Lunch', items: ['Lentil soup', 'Green salad', 'Olive oil dressing'] },
          { name: 'Dinner', items: ['Grilled chicken', 'Sweet potato', 'Green beans'] },
          { name: 'Snack', items: ['Fruit and nut mix'] },
        ]
      },
    ],
    supplementation: ['Calcium', 'Vitamin D', 'Vitamin B12']
  },
  'soy': {
    alternatives: ['Coconut aminos (instead of soy sauce)', 'Chickpeas', 'Lentils', 'Hemp seeds'],
    mealPlan: [
      {
        day: 'Monday',
        meals: [
          { name: 'Breakfast', items: ['Oatmeal with almond milk', 'Fresh berries'] },
          { name: 'Lunch', items: ['Chicken and vegetable soup', 'Gluten-free crackers'] },
          { name: 'Dinner', items: ['Grilled fish', 'Roasted vegetables', 'Quinoa'] },
          { name: 'Snack', items: ['Apple with almond butter'] },
        ]
      },
      {
        day: 'Tuesday',
        meals: [
          { name: 'Breakfast', items: ['Veggie omelet', 'Gluten-free toast'] },
          { name: 'Lunch', items: ['Tuna salad with olive oil', 'Mixed greens'] },
          { name: 'Dinner', items: ['Beef stir-fry with coconut aminos', 'Cauliflower rice'] },
          { name: 'Snack', items: ['Vegetable sticks with hummus'] },
        ]
      },
    ],
    supplementation: ['Iron', 'Calcium', 'Protein supplements']
  },
  'default': {
    alternatives: ['Focus on whole, unprocessed foods', 'Cook meals from scratch', 'Read labels carefully'],
    mealPlan: [
      {
        day: 'Monday',
        meals: [
          { name: 'Breakfast', items: ['Fruit smoothie with protein powder', 'Chia seeds'] },
          { name: 'Lunch', items: ['Simple protein with vegetables', 'Olive oil dressing'] },
          { name: 'Dinner', items: ['Lean protein', 'Steamed vegetables', 'Brown rice'] },
          { name: 'Snack', items: ['Fresh fruit'] },
        ]
      },
      {
        day: 'Tuesday',
        meals: [
          { name: 'Breakfast', items: ['Oatmeal with fruit', 'Seeds'] },
          { name: 'Lunch', items: ['Homemade soup', 'Side salad'] },
          { name: 'Dinner', items: ['Baked protein', 'Roasted vegetables', 'Quinoa'] },
          { name: 'Snack', items: ['Vegetable sticks'] },
        ]
      },
    ],
    supplementation: ['Consult with a nutritionist', 'Multivitamin', 'Omega-3 fatty acids']
  }
};

const DietaryManagement = () => {
  const [dietPlan, setDietPlan] = useState(SAMPLE_DIET_PLANS.default);
  
  useEffect(() => {
    // Get allergies from localStorage and determine diet plan
    const allergies = localStorage.getItem('allergies') || '';
    
    if (allergies.toLowerCase().includes('peanut')) {
      setDietPlan(SAMPLE_DIET_PLANS.peanuts);
    } else if (allergies.toLowerCase().includes('milk')) {
      setDietPlan(SAMPLE_DIET_PLANS.milk);
    } else if (allergies.toLowerCase().includes('soy')) {
      setDietPlan(SAMPLE_DIET_PLANS.soy);
    }
  }, []);

  return (
    <DashboardLayout title="Dietary Management">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="bg-gradient-to-r from-primary to-blue-600 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Your Personalized Diet Plan</h2>
            <p className="opacity-90">
              Based on your allergy profile, we've created a customized diet plan to help you avoid allergens
              and maintain a balanced diet.
            </p>
          </div>
        </Card>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Foods to Avoid
              </CardTitle>
              <CardDescription>
                Based on your allergy profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {/* This would be dynamic based on user's actual allergies */}
                {JSON.parse(localStorage.getItem('allergies') || '""')
                  .split(',')
                  .filter((allergy: string) => allergy.trim() !== '')
                  .map((allergy: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                        <span className="text-red-600 text-xs">✕</span>
                      </span>
                      <span>{allergy.trim()}</span>
                    </li>
                  ))}
                {(!localStorage.getItem('allergies') || localStorage.getItem('allergies') === '') && (
                  <li className="text-sm text-muted-foreground">
                    No specific allergies listed. Please update your profile.
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                Recommended Alternatives
              </CardTitle>
              <CardDescription>
                Safe substitutes for allergenic foods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dietPlan.alternatives.map((alternative, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-green-600" />
                    </span>
                    <span>{alternative}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Supplementation
              </CardTitle>
              <CardDescription>
                Consider these nutrients when avoiding certain foods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dietPlan.supplementation.map((supplement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <Info className="h-3 w-3 text-blue-600" />
                    </span>
                    <span>{supplement}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Always consult with a healthcare professional before starting any supplement regimen.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="mealPlan">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="mealPlan">Weekly Meal Plan</TabsTrigger>
            <TabsTrigger value="recipes">Allergen-Free Recipes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mealPlan" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your 7-Day Meal Plan</CardTitle>
                <CardDescription>
                  A balanced diet tailored to your dietary restrictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {dietPlan.mealPlan.map((day, dayIndex) => (
                    <div key={dayIndex} className="pb-6 last:pb-0 border-b last:border-0">
                      <h3 className="text-lg font-medium mb-4 bg-primary/10 py-2 px-3 rounded-md inline-block">
                        {day.day}
                      </h3>
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        {day.meals.map((meal, mealIndex) => (
                          <Card key={mealIndex} className="overflow-hidden border-primary/10">
                            <div className="bg-primary/5 py-2 px-4 border-b border-primary/10">
                              <h4 className="font-medium">{meal.name}</h4>
                            </div>
                            <CardContent className="p-4">
                              <ul className="space-y-1">
                                {meal.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="text-sm flex items-baseline gap-2">
                                    <span className="text-primary text-xs">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recipes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Allergen-Free Recipes</CardTitle>
                <CardDescription>
                  Delicious recipes that avoid your specific allergens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {/* These would be dynamic based on user's allergies in a real app */}
                  <Card className="overflow-hidden hover-lift">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <span className="text-4xl">🥗</span>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">Allergen-Free Quinoa Salad</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        A protein-rich salad free from major allergens
                      </p>
                      <Button variant="outline" size="sm" className="w-full group">
                        <span className="group-hover:mr-2 transition-all">View Recipe</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 absolute right-4 transition-all" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden hover-lift">
                    <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                      <span className="text-4xl">🥘</span>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">Allergen-Free One Pot Dinner</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Simple and safe dinner option for the whole family
                      </p>
                      <Button variant="outline" size="sm" className="w-full group">
                        <span className="group-hover:mr-2 transition-all">View Recipe</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 absolute right-4 transition-all" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden hover-lift">
                    <div className="aspect-video bg-gradient-to-br from-amber-100 to-red-100 flex items-center justify-center">
                      <span className="text-4xl">🍪</span>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">Allergen-Free Cookies</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Delicious cookies without common allergens
                      </p>
                      <Button variant="outline" size="sm" className="w-full group">
                        <span className="group-hover:mr-2 transition-all">View Recipe</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 absolute right-4 transition-all" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden hover-lift">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <span className="text-4xl">🥤</span>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">Allergen-Free Smoothies</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Nutritious smoothies safe for your allergies
                      </p>
                      <Button variant="outline" size="sm" className="w-full group">
                        <span className="group-hover:mr-2 transition-all">View Recipe</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 absolute right-4 transition-all" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-8 text-center">
                  <Button className="group">
                    <span className="group-hover:mr-2 transition-all">Explore More Recipes</span>
                    <ExternalLink className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-all" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default DietaryManagement;
