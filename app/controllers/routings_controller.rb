include ApplicationHelper

class RoutingsController < ApplicationController
  layout :layout_locale

  def check_sign_in
    if user_signed_in?
      redirect_to params[:path]
    else
      path = '/users/sign_in?path=' + params[:path]
      redirect_to path
    end
  end

end
