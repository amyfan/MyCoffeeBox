class SubscriptionsController < ApplicationController
  layout :layout_locale

  # GET /subscriptions
  # GET /subscriptions.json
  def index
    @subscriptions = Subscription.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @subscriptions }
    end
  end

  # GET /subscriptions/1
  # GET /subscriptions/1.json
  def show
    @subscription = Subscription.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @subscription }
    end
  end

  # GET /subscriptions/new
  # GET /subscriptions/new.json
  def new
    @subscription = Subscription.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @subscription }
    end
  end

  # GET /subscriptions/1/edit
  def edit
    @subscription = Subscription.find(params[:id])
  end

  # POST /subscriptions
  # POST /subscriptions.json
  def create
    @subscription = Subscription.new(params[:subscription])
    @subscription.user = current_user

    respond_to do |format|
      if @subscription.save
        format.html { redirect_to @subscription, :notice => 'Subscription was successfully created.' }
        format.json { render :json => @subscription, :status => :created, :location => @subscription }
      else
        format.html { render :action => "new" }
        format.json { render :json => @subscription.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /subscriptions/1
  # PUT /subscriptions/1.json
  def update
    @subscription = Subscription.find(params[:id])
    if @subscription.user == nil
      subscription_attributes = params[:subscription]
      subscription_attributes[:user] = current_user
    end

    respond_to do |format|
      #raise subscription_attributes
      if @subscription.update_attributes(subscription_attributes)
        format.html { redirect_to @subscription, :notice => 'Subscription was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @subscription.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /subscriptions/1
  # DELETE /subscriptions/1.json
  def destroy
    @subscription = Subscription.find(params[:id])
    @subscription.destroy

    respond_to do |format|
      format.html { redirect_to dashboards_url }
      format.json { head :no_content }
    end
  end

  # POST /subscriptions/create_copy
  # POST /subscriptions/create_copy.json
  def create_copy
    product_item = create_product_item(params[:where_value])
    shipping_info = create_shipping(params[:shipping_info])
    @subscription = Subscription.new(params[:subscription])
    # @subscription.conekta_id = latest_subscription[:id]
    @subscription.user = current_user
    @subscription.payment_status = 'Pending'
    @subscription.product_item = product_item
    @subscription.shipping_info = shipping_info
    @subscription.save

    respond_to do |format|
      format.html { head :no_content }
      format.json { head :no_content }
    end
  end

  # POST /subscriptions/pause_subscription/1
  # POST /subscriptions/pause_subscription/1.json
  def pause_subscription
    @subscription = Subscription.find(params[:id])
    MyMailer.pause_subscription(@subscription).deliver
    @subscription.payment_status = 'Paused'
    @subscription.save

    respond_to do |format|
      format.html { redirect_to dashboards_url }
      format.json { head :no_content }
    end
  end

  def resume_subscription
    @subscription = Subscription.find(params[:id])
    MyMailer.resume_subscription(@subscription).deliver
    @subscription.payment_status = 'Pending'
    @subscription.save

    respond_to do |format|
      format.html { redirect_to dashboards_url }
      format.json { head :no_content }
    end
  end

  def query_conekta
    email = params[:email]
    url_string = 'http://www.conekta.mx/api/v1/subscriptions?auth_token=YE138iSl1KAFfZxRS3f&search=' + email
    response = HTTParty.get(url_string)
    hash = JSON.parse response.body
    # sort in descending order
    hash.sort! {|a,b| b['id']<=>a['id']}
    latest_subscription = hash[0]
    # TODO: use filter to only accept pagado status
  end
  
  private

  def create_product_item(where_value)
    product = Product.where(:order_type => 'subscription', :where_value => where_value).first
    product_item = ProductItem.new
    product_item.product = product
    product_item.quantity = 1
    product_item.save
    return product_item
  end

  def create_shipping(params)
    shipping_info = ShippingInfo.new(params)
    shipping_info.save
    return shipping_info
  end
end
