class ProductItemCell < Cell::Rails

  def display(args)
    @subscription = args[:subscription]
    @product_item  = @subscription.product_item
    render
  end

end
