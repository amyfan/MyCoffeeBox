class PaymentMethodCell < Cell::Rails

  def display(args)
    user = args[:user]
    @payment_methods  = user.payment_methods

    render :display
  end

end
