class SubscriptionCell < Cell::Rails

  def display(args)
    user = args[:user]
    @subscriptions  = user.subscriptions

    render :display
  end

  def manage(args)
    user = args[:user]
    if user != nil
      @subscriptions = user.subscriptions
    else
      @subscriptions = Subscription.all
    end

    render :manage
  end

end
