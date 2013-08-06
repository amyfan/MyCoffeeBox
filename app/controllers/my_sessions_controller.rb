include ApplicationHelper
class MySessionsController < Devise::SessionsController
  layout :layout_locale

  def new
    super
    session[:path] = params[:path]
  end

  def after_sign_in_path_for(user)
    #if can? :manage, user
    #  users_path
    #else
    #  user_path(user)
    #end
    if session[:path] != nil
      session[:path]
    else
      dashboards_path
    end
  end
end
