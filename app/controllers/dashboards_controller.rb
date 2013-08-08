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
  
  def view_users
    authorize! :read, @user
    if can? :manage, @user
      render :users_admin
    else
      render :index_user
    end
  end

  def view_products
    authorize! :read, @user
    if can? :manage, @user
      render :products_admin
    else
      render :index_user
    end
  end

  def view_subscriptions
    authorize! :read, @user
    if can? :manage, @user
      render :subscriptions_admin
    else
      render :index_user
    end
  end

  def view_payments
    authorize! :read, @user
    if can? :manage, @user
      render :payments_admin
    else
      render :index_user
    end
  end

  def view_shipments
    authorize! :read, @user
    if can? :manage, @user
      render :shipments_admin
    else
      render :index_user
    end
  end

end
