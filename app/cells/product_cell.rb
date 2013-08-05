class ProductCell < Cell::Rails

  def display
    @products = Product.all
    render
  end

end
