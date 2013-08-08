class PaymentCell < Cell::Rails

  def display(args)
    @payments = args[:payments]

    render :display
  end

  def manage
    @payments = Payment.all
    render :manage
  end

  def recent
    @payments = Payment.limit(10).order('created_at desc')
    render :recent
  end

end
