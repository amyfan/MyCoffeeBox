include ApplicationHelper

class MyConfirmationsController < Devise::ConfirmationsController
  layout :layout_locale

  def new
    super
  end
end
