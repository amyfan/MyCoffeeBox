include ApplicationHelper

class DashboardsController < ApplicationController
  before_filter :authenticate_user!
  layout :layout_locale

  def index
    authorize! :read, @user
    if can? :manage, @user
      render :index_admin
    else
      render :index_user
    end
  end

end
