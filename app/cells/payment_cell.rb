class PaymentCell < Cell::Rails

  def display(args)
    @payments = args[:payments]

    render :display
  end

  def manage
    @payments = Payment.all
    render :manage
  end

end
