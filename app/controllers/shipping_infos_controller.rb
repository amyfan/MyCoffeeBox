class ShippingInfosController < ApplicationController
  layout :layout_locale

  # GET /shipping_infos
  # GET /shipping_infos.json
  def index
    @shipping_infos = ShippingInfo.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @shipping_infos }
    end
  end

  # GET /shipping_infos/1
  # GET /shipping_infos/1.json
  def show
    @shipping_info = ShippingInfo.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @shipping_info }
    end
  end

  # GET /shipping_infos/new
  # GET /shipping_infos/new.json
  def new
    @shipping_info = ShippingInfo.new
    user = User.find(params[:user_id])
    @shipping_info.user = user

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @shipping_info }
    end
  end

  # GET /shipping_infos/1/edit
  def edit
    @shipping_info = ShippingInfo.find(params[:id])
  end

  # POST /shipping_infos
  # POST /shipping_infos.json
  def create
    @shipping_info = ShippingInfo.new(params[:shipping_info])

    respond_to do |format|
      if @shipping_info.save
        format.html { redirect_to @shipping_info, :notice => 'Shipping info was successfully created.' }
        format.json { render :json => @shipping_info, :status => :created, :location => @shipping_info }
      else
        format.html { render :action => "new" }
        format.json { render :json => @shipping_info.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /shipping_infos/1
  # PUT /shipping_infos/1.json
  def update
    @shipping_info = ShippingInfo.find(params[:id])

    respond_to do |format|
      if @shipping_info.update_attributes(params[:shipping_info])
        format.html { redirect_to @shipping_info, :notice => 'Shipping info was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @shipping_info.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /shipping_infos/1
  # DELETE /shipping_infos/1.json
  def destroy
    @shipping_info = ShippingInfo.find(params[:id])
    @shipping_info.destroy

    respond_to do |format|
      format.html { redirect_to dashboards_url }
      format.json { head :no_content }
    end
  end
<<<<<<< HEAD
=======

  # POST /shipping_infos/action
  # POST /shipping_infos/action.json
  def createcopy
    @shipping_info = ShippingInfo.new(params[:shipping_info])
    @shipping_info.save
  end
>>>>>>> 0e98ad2b23d969d5fc0e659075fb655a013323bf
end
