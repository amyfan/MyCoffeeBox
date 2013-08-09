class PaymentMethodCell < Cell::Rails

  def display(args)
    @payment_method  = args[:payment_method]
    render
  end

end
