class MyMailer < ActionMailer::Base
  default from: 'info@mycoffeebox.mx'

  def pause_subscription(subscription)
    @subscription = subscription
    mail(to: 'amyfan@gmail.com', subject: 'REQUEST: Pause Subscription')
  end

  def resume_subscription(subscription)
    @subscription = subscription
    mail(to: 'amyfan@gmail.com', subject: 'REQUEST: Resume Subscription')
  end
end
