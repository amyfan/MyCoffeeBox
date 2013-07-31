class ShipmentCell < Cell::Rails

  def display(args)
    payment = args[:payment]
    @shipments  = payment.shipments

    render :display
  end

  def manage
    @shipments = Shipment.all

    render :manage
  end

end
