package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// Product represents an item in the store
type Product struct {
	ID            int       `json:"id"`
	Name          string    `json:"name"`
	Slug          string    `json:"slug"`
	Description   string    `json:"description"`
	Price         float64   `json:"price"`
	CompareAtPrice *float64  `json:"compareAtPrice,omitempty"`
	Images        []string  `json:"images"`
	Category      string    `json:"category"`
	Tags          []string  `json:"tags"`
	Stock         int       `json:"stock"`
	Ratings       *Ratings  `json:"ratings,omitempty"`
	IsFeatured    bool      `json:"isFeatured"`
	IsNew         bool      `json:"isNew"`
	CreatedAt     time.Time `json:"createdAt"`
	UpdatedAt     time.Time `json:"updatedAt"`
}

// Ratings contains the product's rating information
type Ratings struct {
	Average float64 `json:"average"`
	Count   int     `json:"count"`
}

// CartItem represents an item in a user's cart
type CartItem struct {
	ID        int     `json:"id"`
	ProductID int     `json:"productId"`
	Name      string  `json:"name"`
	Price     float64 `json:"price"`
	Quantity  int     `json:"quantity"`
	Image     string  `json:"image"`
}

// Cart represents a user's shopping cart
type Cart struct {
	ID       int        `json:"id"`
	UserID   *int       `json:"userId,omitempty"`
	Items    []CartItem `json:"items"`
	Subtotal float64    `json:"subtotal"`
	Tax      float64    `json:"tax"`
	Shipping float64    `json:"shipping"`
	Total    float64    `json:"total"`
}

// Category represents a product category
type Category struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Slug        string `json:"slug"`
	Image       string `json:"image"`
	Description string `json:"description"`
}

// Placeholder data
var products = []Product{
	{
		ID:          1,
		Name:        "Minimalist Desk Lamp",
		Slug:        "minimalist-desk-lamp",
		Description: "A sleek, adjustable desk lamp with touch controls and multiple brightness settings. Perfect for your home office or study area.",
		Price:       89.99,
		CompareAtPrice: floatPtr(119.99),
		Images: []string{
			"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=266&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1534115509038-2c01d01f3922?q=80&w=1887&auto=format&fit=crop",
		},
		Category: "Home Office",
		Tags:     []string{"lighting", "desk", "home office", "minimalist"},
		Stock:    45,
		Ratings: &Ratings{
			Average: 4.7,
			Count:   28,
		},
		IsFeatured: true,
		IsNew:      false,
		CreatedAt:  time.Now().Add(-30 * 24 * time.Hour),
		UpdatedAt:  time.Now().Add(-30 * 24 * time.Hour),
	},
	{
		ID:          2,
		Name:        "Ergonomic Office Chair",
		Slug:        "ergonomic-office-chair",
		Description: "High-quality ergonomic chair with lumbar support, adjustable height, and breathable mesh back. Designed for comfort during long work hours.",
		Price:       249.99,
		CompareAtPrice: floatPtr(299.99),
		Images: []string{
			"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=2000&auto=format&fit=crop",
		},
		Category: "Furniture",
		Tags:     []string{"chair", "office", "ergonomic", "furniture"},
		Stock:    18,
		Ratings: &Ratings{
			Average: 4.9,
			Count:   42,
		},
		IsFeatured: true,
		IsNew:      true,
		CreatedAt:  time.Now().Add(-20 * 24 * time.Hour),
		UpdatedAt:  time.Now().Add(-20 * 24 * time.Hour),
	},
	{
		ID:          3,
		Name:        "Wireless Earbuds",
		Slug:        "wireless-earbuds",
		Description: "Premium wireless earbuds with active noise cancellation, crystal-clear sound, and long battery life. Includes wireless charging case.",
		Price:       129.99,
		CompareAtPrice: floatPtr(149.99),
		Images: []string{
			"https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1889&auto=format&fit=crop",
		},
		Category: "Electronics",
		Tags:     []string{"earbuds", "audio", "wireless", "music"},
		Stock:    62,
		Ratings: &Ratings{
			Average: 4.5,
			Count:   107,
		},
		IsFeatured: true,
		IsNew:      true,
		CreatedAt:  time.Now().Add(-15 * 24 * time.Hour),
		UpdatedAt:  time.Now().Add(-15 * 24 * time.Hour),
	},
	{
		ID:          4,
		Name:        "Smart Watch",
		Slug:        "smart-watch",
		Description: "Feature-packed smartwatch with health monitoring, notifications, GPS, and a vibrant touchscreen display. Compatible with iOS and Android.",
		Price:       199.99,
		CompareAtPrice: floatPtr(229.99),
		Images: []string{
			"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1772&auto=format&fit=crop",
		},
		Category: "Electronics",
		Tags:     []string{"smart watch", "wearable", "fitness", "tech"},
		Stock:    27,
		Ratings: &Ratings{
			Average: 4.6,
			Count:   89,
		},
		IsFeatured: true,
		IsNew:      false,
		CreatedAt:  time.Now().Add(-45 * 24 * time.Hour),
		UpdatedAt:  time.Now().Add(-45 * 24 * time.Hour),
	},
}

var categories = []Category{
	{
		ID:          1,
		Name:        "Electronics",
		Slug:        "electronics",
		Image:       "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1801&auto=format&fit=crop",
		Description: "Latest gadgets and electronic devices",
	},
	{
		ID:          2,
		Name:        "Clothing",
		Slug:        "clothing",
		Image:       "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop",
		Description: "Fashion and apparel for all seasons",
	},
	{
		ID:          3,
		Name:        "Home & Kitchen",
		Slug:        "home-kitchen",
		Image:       "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop",
		Description: "Everything for your home",
	},
}

// CartManager handles cart operations with thread safety
type CartManager struct {
	carts map[int]Cart
	mutex sync.RWMutex
	nextCartID int
}

var cartManager = &CartManager{
	carts: make(map[int]Cart),
	nextCartID: 1,
}

// Helper to create a float pointer
func floatPtr(f float64) *float64 {
	return &f
}

// Helper to send JSON responses
func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, err := json.Marshal(payload)
	if err != nil {
		log.Printf("Error marshaling JSON: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

// Get all products
func getProducts(w http.ResponseWriter, r *http.Request) {
	respondWithJSON(w, http.StatusOK, products)
}

// Get a single product by slug
func getProductBySlug(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	slug := vars["slug"]

	for _, product := range products {
		if product.Slug == slug {
			respondWithJSON(w, http.StatusOK, product)
			return
		}
	}

	respondWithJSON(w, http.StatusNotFound, map[string]string{"error": "Product not found"})
}

// Get featured products
func getFeaturedProducts(w http.ResponseWriter, r *http.Request) {
	var featuredProducts []Product
	for _, product := range products {
		if product.IsFeatured {
			featuredProducts = append(featuredProducts, product)
		}
	}
	respondWithJSON(w, http.StatusOK, featuredProducts)
}

// Get all categories
func getCategories(w http.ResponseWriter, r *http.Request) {
	respondWithJSON(w, http.StatusOK, categories)
}

// Get a cart by ID or create a new one
func getCart(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	cartIDStr := vars["id"]

	var cart Cart
	var exists bool

	if cartIDStr == "new" {
		// Create a new cart
		cartManager.mutex.Lock()
		cartID := cartManager.nextCartID
		cartManager.nextCartID++

		cart = Cart{
			ID:       cartID,
			Items:    []CartItem{},
			Subtotal: 0,
			Tax:      0,
			Shipping: 0,
			Total:    0,
		}

		cartManager.carts[cartID] = cart
		cartManager.mutex.Unlock()
	} else {
		// Get existing cart
		cartID, err := strconv.Atoi(cartIDStr)
		if err != nil {
			respondWithJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid cart ID"})
			return
		}

		cartManager.mutex.RLock()
		cart, exists = cartManager.carts[cartID]
		cartManager.mutex.RUnlock()

		if !exists {
			respondWithJSON(w, http.StatusNotFound, map[string]string{"error": "Cart not found"})
			return
		}
	}

	respondWithJSON(w, http.StatusOK, cart)
}

// Add item to cart
func addToCart(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	cartIDStr := vars["id"]
	cartID, err := strconv.Atoi(cartIDStr)

	if err != nil {
		respondWithJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid cart ID"})
		return
	}

	var request struct {
		ProductID int `json:"productId"`
		Quantity  int `json:"quantity"`
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&request); err != nil {
		respondWithJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
		return
	}

	// Find the product
	var product *Product
	for i := range products {
		if products[i].ID == request.ProductID {
			product = &products[i]
			break
		}
	}

	if product == nil {
		respondWithJSON(w, http.StatusNotFound, map[string]string{"error": "Product not found"})
		return
	}

	cartManager.mutex.Lock()
	defer cartManager.mutex.Unlock()

	cart, exists := cartManager.carts[cartID]
	if !exists {
		respondWithJSON(w, http.StatusNotFound, map[string]string{"error": "Cart not found"})
		return
	}

	// Check if item already exists in cart
	var itemExists bool
	for i, item := range cart.Items {
		if item.ProductID == request.ProductID {
			// Update quantity
			cart.Items[i].Quantity += request.Quantity
			itemExists = true
			break
		}
	}

	if !itemExists {
		// Add new item
		newItem := CartItem{
			ID:        len(cart.Items) + 1,
			ProductID: product.ID,
			Name:      product.Name,
			Price:     product.Price,
			Quantity:  request.Quantity,
			Image:     product.Images[0],
		}
		cart.Items = append(cart.Items, newItem)
	}

	// Recalculate cart totals
	cart.Subtotal = 0
	for _, item := range cart.Items {
		cart.Subtotal += item.Price * float64(item.Quantity)
	}

	cart.Tax = cart.Subtotal * 0.08 // 8% tax
	cart.Shipping = 10.0 // Flat shipping rate
	cart.Total = cart.Subtotal + cart.Tax + cart.Shipping

	// Update the cart
	cartManager.carts[cartID] = cart

	respondWithJSON(w, http.StatusOK, cart)
}

// Update item quantity
func updateCartItem(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	cartIDStr := vars["id"]
	itemIDStr := vars["itemId"]

	cartID, err := strconv.Atoi(cartIDStr)
	if err != nil {
		respondWithJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid cart ID"})
		return
	}

	itemID, err := strconv.Atoi(itemIDStr)
	if err != nil {
		respondWithJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid item ID"})
		return
	}

	var request struct {
		Quantity int `json:"quantity"`
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&request); err != nil {
		respondWithJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
		return
	}

	cartManager.mutex.Lock()
	defer cartManager.mutex.Unlock()

	cart, exists := cartManager.carts[cartID]
	if !exists {
		respondWithJSON(w, http.StatusNotFound, map[string]string{"error": "Cart not found"})
		return
	}

	// Find the item
	var itemFound bool
	for i, item := range cart.Items {
		if item.ID == itemID {
			if request.Quantity <= 0 {
				// Remove item
				cart.Items = append(cart.Items[:i], cart.Items[i+1:]...)
			} else {
				// Update quantity
				cart.Items[i].Quantity = request.Quantity
			}
			itemFound = true
			break
		}
	}

	if !itemFound {
		respondWithJSON(w, http.StatusNotFound, map[string]string{"error": "Item not found in cart"})
		return
	}

	// Recalculate cart totals
	cart.Subtotal = 0
	for _, item := range cart.Items {
		cart.Subtotal += item.Price * float64(item.Quantity)
	}

	cart.Tax = cart.Subtotal * 0.08 // 8% tax
	cart.Shipping = 10.0 // Flat shipping rate
	cart.Total = cart.Subtotal + cart.Tax + cart.Shipping

	// Update the cart
	cartManager.carts[cartID] = cart

	respondWithJSON(w, http.StatusOK, cart)
}

// Remove item from cart
func removeCartItem(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	cartIDStr := vars["id"]
	itemIDStr := vars["itemId"]

	cartID, err := strconv.Atoi(cartIDStr)
	if err != nil {
		respondWithJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid cart ID"})
		return
	}

	itemID, err := strconv.Atoi(itemIDStr)
	if err != nil {
		respondWithJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid item ID"})
		return
	}

	cartManager.mutex.Lock()
	defer cartManager.mutex.Unlock()

	cart, exists := cartManager.carts[cartID]
	if !exists {
		respondWithJSON(w, http.StatusNotFound, map[string]string{"error": "Cart not found"})
		return
	}

	// Find the item
	var itemFound bool
	for i, item := range cart.Items {
		if item.ID == itemID {
			// Remove item
			cart.Items = append(cart.Items[:i], cart.Items[i+1:]...)
			itemFound = true
			break
		}
	}

	if !itemFound {
		respondWithJSON(w, http.StatusNotFound, map[string]string{"error": "Item not found in cart"})
		return
	}

	// Recalculate cart totals
	cart.Subtotal = 0
	for _, item := range cart.Items {
		cart.Subtotal += item.Price * float64(item.Quantity)
	}

	cart.Tax = cart.Subtotal * 0.08 // 8% tax
	cart.Shipping = 10.0 // Flat shipping rate if cart is not empty
	if len(cart.Items) == 0 {
		cart.Shipping = 0
	}
	cart.Total = cart.Subtotal + cart.Tax + cart.Shipping

	// Update the cart
	cartManager.carts[cartID] = cart

	respondWithJSON(w, http.StatusOK, cart)
}

// Main function
func main() {
	r := mux.NewRouter()

	// Product routes
	r.HandleFunc("/api/products", getProducts).Methods("GET")
	r.HandleFunc("/api/products/{slug}", getProductBySlug).Methods("GET")
	r.HandleFunc("/api/products/featured", getFeaturedProducts).Methods("GET")

	// Category routes
	r.HandleFunc("/api/categories", getCategories).Methods("GET")

	// Cart routes
	r.HandleFunc("/api/cart/{id}", getCart).Methods("GET")
	r.HandleFunc("/api/cart/{id}/items", addToCart).Methods("POST")
	r.HandleFunc("/api/cart/{id}/items/{itemId}", updateCartItem).Methods("PUT")
	r.HandleFunc("/api/cart/{id}/items/{itemId}", removeCartItem).Methods("DELETE")

	// Set up CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // Allow all origins for development
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		Debug:          true,
	})

	handler := c.Handler(r)

	// Start server
	log.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
