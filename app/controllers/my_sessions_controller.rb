include ApplicationHelper
class MySessionsController < Devise::SessionsController
  layout :layout_locale

  def after_sign_in_path_for(user)
    #if can? :manage, user
    #  users_path
    #else
    #  user_path(user)
    #end
    dashboards_path
  end
end
