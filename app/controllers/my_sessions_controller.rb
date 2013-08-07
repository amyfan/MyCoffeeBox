include ApplicationHelper
class MySessionsController < Devise::SessionsController
  layout :layout_locale

  def new
    super
    if params[:path] != nil
      session[:path] = params[:path]
    end
  end

  def after_sign_in_path_for(user)
    #if can? :manage, user
    #  users_path
    #else
    #  user_path(user)
    #end
    if session[:path] != nil
      path = session[:path]
      session.delete(:path)
      path
    else
      dashboards_path
    end
  end
end
