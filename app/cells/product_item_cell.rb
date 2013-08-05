class ProductItemCell < Cell::Rails

  def display
    @product_items = ProductItem.all
    render
  end

end
