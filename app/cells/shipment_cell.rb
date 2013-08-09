class ShipmentCell < Cell::Rails

  def display(args)
    @shipments  = args[:shipments]

    render :display
  end

  def manage
    @shipments = Shipment.all

    render :manage
  end

  def recent
    @shipments = Shipment.limit(10).order('created_at desc')

    render :recent
  end

end
