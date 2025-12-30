import React, { useState } from 'react';
import { ChefHat, Plus, X, Sparkles, Clock, Users } from 'lucide-react';

const API_URL = 'https://meal-ideas.onrender.com/api';

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  const addIngredient = () => {
    if (currentInput.trim() && !ingredients.includes(currentInput.trim().toLowerCase())) {
      setIngredients([...ingredients, currentInput.trim().toLowerCase()]);
      setCurrentInput('');
    }
  };

  const removeIngredient = (ing) => {
    setIngredients(ingredients.filter(i => i !== ing));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  const getMealSuggestions = async () => {
    if (ingredients.length === 0) return;
    
    setIsLoading(true);
    setSuggestions(null);
    
    try {
      const response = await fetch(`${API_URL}/get-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Error:', err);
      setSuggestions({ error: 'Failed to get suggestions. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getDetailedRecipe = async (mealName) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/get-recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mealName,
          ingredients,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }

      const data = await response.json();
      setConversationHistory(data.conversationHistory);
      setSuggestions({ recipe: data.recipe, mealName });
    } catch (err) {
      console.error('Error:', err);
      setSuggestions({ error: 'Failed to get recipe. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const askFollowUp = async (question) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/ask-followup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process follow-up');
      }

      const data = await response.json();
      setConversationHistory(data.conversationHistory);
      setSuggestions({ recipe: data.response, mealName: suggestions.mealName });
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetApp = () => {
    setSuggestions(null);
    setConversationHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <ChefHat className="w-10 h-10 text-orange-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Make a Meal
            </h1>
          </div>
          <p className="text-gray-600">Transform your ingredients into delicious meals with AI</p>
        </div>

        {/* Main Content */}
        {!suggestions ? (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Ingredient Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                What ingredients do you have?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., chicken, tomatoes, onions..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                />
                <button
                  onClick={addIngredient}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>
            </div>

            {/* Ingredients List */}
            {ingredients.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">Your ingredients:</p>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full"
                    >
                      {ing}
                      <button
                        onClick={() => removeIngredient(ing)}
                        className="hover:bg-orange-200 rounded-full p-0.5"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Get Suggestions Button */}
            <button
              onClick={getMealSuggestions}
              disabled={ingredients.length === 0 || isLoading}
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Finding meals...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Get Meal Suggestions
                </>
              )}
            </button>
          </div>
        ) : suggestions.error ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-red-600 mb-4">{suggestions.error}</p>
            <button
              onClick={resetApp}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Try Again
            </button>
          </div>
        ) : suggestions.recipe ? (
          // Detailed Recipe View
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{suggestions.mealName}</h2>
              <button
                onClick={resetApp}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="prose max-w-none mb-6">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {suggestions.recipe}
              </div>
            </div>

            {/* Follow-up Questions */}
            <div className="border-t pt-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => askFollowUp("Can you suggest substitutes for any ingredients I might not have?")}
                  disabled={isLoading}
                  className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition-colors text-sm disabled:opacity-50"
                >
                  Suggest substitutes
                </button>
                <button
                  onClick={() => askFollowUp("Can you make this recipe simpler?")}
                  disabled={isLoading}
                  className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition-colors text-sm disabled:opacity-50"
                >
                  Make it simpler
                </button>
                <button
                  onClick={() => askFollowUp("Any tips to make this taste better?")}
                  disabled={isLoading}
                  className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition-colors text-sm disabled:opacity-50"
                >
                  Cooking tips
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Meal Suggestions View
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Suggested Meals</h2>
              <button
                onClick={resetApp}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {suggestions.meals?.map((meal, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => getDetailedRecipe(meal.name)}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{meal.name}</h3>
                <p className="text-gray-600 mb-4">{meal.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {meal.prep_time} prep, {meal.cook_time} cook
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Serves {meal.servings}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Using your ingredients:</p>
                  <div className="flex flex-wrap gap-1">
                    {meal.ingredients_used.map((ing, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {meal.additional_needed?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">You'll also need:</p>
                    <div className="flex flex-wrap gap-1">
                      {meal.additional_needed.map((ing, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 text-orange-600 font-semibold text-sm flex items-center gap-1">
                  Click for full recipe <span>→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}