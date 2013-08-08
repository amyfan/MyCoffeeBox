MyCoffeeBox::Application.routes.draw do
  scope "(:locale)", :locale => /en|es/ do
    devise_for :users, :controllers => { :sessions => 'my_sessions', :registrations => 'my_registrations', :passwords => 'my_passwords', :confirmations => 'my_confirmations' }

    resources :users
    resources :subscriptions
    resources :payments
    resources :shipments
    resources :payment_methods
    resources :shipping_infos
    resources :products
    resources :product_items
    resources :dashboards
    
    post 'subscriptions/create_copy(/:id)' => 'subscriptions#create_copy'
    post 'subscriptions/pause_subscription(/:id)' => 'subscriptions#pause_subscription'
    post 'subscriptions/resume_subscription(/:id)' => 'subscriptions#resume_subscription'
    match 'check_sign_in' => 'routings#check_sign_in'
    match 'view_users' => 'dashboards#view_users'
    match 'view_products' => 'dashboards#view_products'
    match 'view_subscriptions' => 'dashboards#view_subscriptions'
    match 'view_payments' => 'dashboards#view_payments'
    match 'view_shipments' => 'dashboards#view_shipments'
  end

  scope "(:locale)", :locale => /es/ do
    match ':locale/:action(/:id)', :controller => "static_pages"
    root :to => "static_pages#home"
    get "static_pages/home"

    match 'subscribe' => 'static_pages#subscribe'
    match 'our_products' => 'static_pages#our_products'
    match 'faq' => 'static_pages#faq'
    match 'contact' => 'static_pages#contact'
    match 'team' => 'static_pages#team'
    match 'how' => 'static_pages#how'
    match 'gift' => 'static_pages#gift'
    match 'padre' => 'static_pages#gift'
    match 'shipping' => 'static_pages#shipping'
    match 'shipping_mex' => 'static_pages#shipping_mex'
    match 'payment_option' => 'static_pages#payment_option'
    match 'order_success' => 'static_pages#order_success'
    match 'order_failure' => 'static_pages#order_failure'
    match 'gus' => 'static_pages#gus'
    match 'hamiltonbeach' => 'static_pages#hamiltonbeach'
    match 'tuola' => 'static_pages#tuola'
    match 'especial' => 'static_pages#especial'
    match 'progress' => 'static_pages#progress'

  end

  scope "(:locale)", :locale => /en/ do
    match ':locale/:action(/:id)', :controller => "static_pages_en"
    root :to => "static_pages_en#home"
    get "static_pages_en/home"

    match 'home' => 'static_pages_en#home'
    match 'subscribe' => 'static_pages_en#subscribe'
    match 'our_products' => 'static_pages_en#our_products'
    match 'faq' => 'static_pages_en#faq'
    match 'contact' => 'static_pages_en#contact'
    match 'team' => 'static_pages_en#team'
    match 'how' => 'static_pages_en#how'
    match 'gift' => 'static_pages_en#gift'
    match 'shipping' => 'static_pages_en#shipping'
    match 'shipping_mex' => 'static_pages#shipping_mex'
    match 'payment_option' => 'static_pages#payment_option'
    match 'order_success' => 'static_pages#order_success'
    match 'order_failure' => 'static_pages#order_failure'

  end

# The priority is based upon order of creation:
# first created -> highest priority.

# Sample of regular route:
#   match 'products/:id' => 'catalog#view'
# Keep in mind you can assign values other than :controller and :action

# Sample of named route:
#   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
# This route can be invoked with purchase_url(:id => product.id)

# Sample resource route (maps HTTP verbs to controller actions automatically):
#   resources :products

# Sample resource route with options:
#   resources :products do
#     member do
#       get 'short'
#       post 'toggle'
#     end
#
#     collection do
#       get 'sold'
#     end
#   end

# Sample resource route with sub-resources:
#   resources :products do
#     resources :comments, :sales
#     resource :seller
#   end

# Sample resource route with more complex sub-resources
#   resources :products do
#     resources :comments
#     resources :sales do
#       get 'recent', :on => :collection
#     end
#   end

# Sample resource route within a namespace:
#   namespace :admin do
#     # Directs /admin/products/* to Admin::ProductsController
#     # (app/controllers/admin/products_controller.rb)
#     resources :products
#   end

# You can have the root of your site routed with "root"
# just remember to delete public/index.html.
# root :to => 'welcome#index'

# See how all your routes lay out with "rake routes"

# This is a legacy wild controller route that's not recommended for RESTful applications.
# Note: This route will make all actions in every controller accessible via GET requests.

end
