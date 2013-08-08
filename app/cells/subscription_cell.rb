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

  def recent
    @subscriptions = Subscription.limit(10).order('created_at desc')
    render :recent
  end

end
