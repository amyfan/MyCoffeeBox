class ShippingInfoCell < Cell::Rails

  def display(args)
    @subscription = args[:subscription]
    @shipping_info  = @subscription.shipping_info
    render
  end

  def manage(args)
    user = args[:user]
    if user != nil
      @shipping_infos = user.shipping_infos
    else
      @shipping_infos = ShippingInfo.all
    end
    render
  end

end
