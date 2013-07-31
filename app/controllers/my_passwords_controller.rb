include ApplicationHelper

class MyPasswordsController < Devise::PasswordsController
  layout :layout_locale

  def new
    super
  end

  def edit
    super
  end
end
