class MyMailer < ActionMailer::Base
  default from: 'info@mycoffeebox.mx'

  def pause_subscription(subscription)
    @subscription = subscription
    mail(to: 'info@mycoffeebox.mx', subject: 'REQUEST: Pause Subscription')
  end

  def resume_subscription(subscription)
    @subscription = subscription
    mail(to: 'info@mycoffeebox.mx', subject: 'REQUEST: Resume Subscription')
  end
end
