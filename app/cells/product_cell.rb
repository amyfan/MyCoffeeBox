class ProductCell < Cell::Rails

  def display(args)
    product_item = args[:product_item]
    @product  = product_item.product
    render
  end

  def manage
    @products = Product.all
    render
  end

end
